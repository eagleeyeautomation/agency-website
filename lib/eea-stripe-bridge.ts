import { createHmac, timingSafeEqual } from "node:crypto";

export const EEA_LOCATION_ID = "1eewm7UQZz3fRKkbuXmI";
export const FLEXIBLE_LINK_ID = "plink_1UVarq1m05iwrAHSXxUHo1LF";
export const ONBOARDING_PRICE_ID = "price_1UVBpl1m05iwrAHS3f1JGFDK";
export const ONBOARDING_PRODUCT_ID = "prod_VWEI1eI2lqmWUX";

export const OFFERS = {
  price_1UV9uZ1m05iwrAHSYQYkBVvk: {
    name: "Starter",
    productId: "prod_VWCJTFuUO3rBOQ",
    amount: 34900,
    recurringAmount: 9900,
    paymentLinkId: "plink_1UVBqg1m05iwrAHSGf5jUXtP",
  },
  price_1UV9wT1m05iwrAHS5DE49T4F: {
    name: "Growth",
    productId: "prod_VWCLuP2Djqb23S",
    amount: 54900,
    recurringAmount: 29900,
    paymentLinkId: "plink_1UVBrP1m05iwrAHSoY4elxs7",
  },
  price_1UV9wd1m05iwrAHSPo51tkJG: {
    name: "Scale",
    productId: "prod_VWCLDw3XFcUPZz",
    amount: 74900,
    recurringAmount: 49900,
    paymentLinkId: "plink_1UVBs11m05iwrAHSpFvtFBf5",
  },
} as const;

const SUCCESS_EVENTS = new Set(["checkout.session.completed"]);

export class BridgeError extends Error {
  constructor(public readonly code: string, public readonly status = 400) {
    super(code);
  }
}

export class AmbiguousForwardError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
  }
}

export type NormalizedEvent = {
  eventId: string;
  paymentId: string;
  checkoutSessionId: string;
  customerId: string;
  subscriptionId: string;
  eventType: string;
  route: "payment_confirmed" | "finance_review";
  offer: string | null;
  email: string;
  name: string | null;
  phone: string | null;
  priceId: string;
  productId: string;
  onboardingPriceId: string;
  onboardingProductId: string;
  paymentLinkId: string;
  amountCents: number;
  currency: "usd";
  paymentStatus: string;
  mode: "test" | "live";
};

type StripeObject = Record<string, unknown> & {
  id?: string;
  payment_intent?: string;
  customer?: string;
  subscription?: string;
  mode?: string;
  payment_link?: string;
  amount_total?: number;
  amount_received?: number;
  currency?: string;
  payment_status?: string;
  status?: string;
  customer_email?: string;
  customer_details?: { email?: string; name?: string; phone?: string };
  metadata?: Record<string, string>;
  line_items?: { data?: StripeLineItem[] };
};

type StripeLineItem = {
  amount_total?: number;
  quantity?: number;
  price?: {
    id?: string;
    product?: string;
    type?: string;
    recurring?: { interval?: string; interval_count?: number } | null;
  };
};

type StripeEvent = {
  id?: string;
  type?: string;
  livemode?: boolean;
  data?: { object?: StripeObject };
};

export interface DedupStore {
  claim(eventId: string, paymentId: string): Promise<"claimed" | "duplicate">;
  markForwarded(eventId: string): Promise<void>;
  markFailed(eventId: string, reason: string): Promise<void>;
  markBlocked(eventId: string, reason: string): Promise<void>;
}

export interface Forwarder {
  send(event: NormalizedEvent): Promise<void>;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") throw new BridgeError(`missing:${field}`);
  return value;
}

function requiredId(value: unknown, field: string): string {
  if (typeof value === "string") return requiredString(value, field);
  if (value && typeof value === "object" && "id" in value) {
    return requiredString((value as { id?: unknown }).id, field);
  }
  throw new BridgeError(`missing:${field}`);
}

export function verifyStripeSignature(raw: Uint8Array, header: string, secret: string, now = Date.now(), toleranceSeconds = 300) {
  const pairs = header.split(",").map((part) => part.split("=", 2));
  const timestampText = pairs.find(([key]) => key === "t")?.[1];
  const signatures = pairs.filter(([key]) => key === "v1").map(([, value]) => value);
  const timestamp = Number(timestampText);
  if (!Number.isInteger(timestamp) || signatures.length === 0) throw new BridgeError("malformed_signature");
  if (Math.abs(Math.floor(now / 1000) - timestamp) > toleranceSeconds) throw new BridgeError("expired_signature");
  const expected = createHmac("sha256", secret).update(`${timestamp}.`).update(raw).digest();
  const valid = signatures.some((candidate) => {
    try {
      const actual = Buffer.from(candidate, "hex");
      return actual.length === expected.length && timingSafeEqual(actual, expected);
    } catch {
      return false;
    }
  });
  if (!valid) throw new BridgeError("invalid_signature");
}

function normalizeEmail(value: unknown): string {
  const email = requiredString(value, "customer_email").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new BridgeError("invalid_customer_email");
  return email;
}

export function normalizeStripeEvent(raw: Uint8Array, allowLive: boolean): NormalizedEvent {
  let event: StripeEvent;
  try {
    event = JSON.parse(Buffer.from(raw).toString("utf8")) as StripeEvent;
  } catch {
    throw new BridgeError("invalid_json");
  }
  if (event.livemode && !allowLive) throw new BridgeError("live_mode_rejected");
  const object = event.data?.object ?? {};
  const eventId = requiredString(event.id, "event_id");
  const eventType = requiredString(event.type, "event_type");
  if (!SUCCESS_EVENTS.has(eventType)) throw new BridgeError("unsupported_event");
  const checkoutSessionId = requiredString(object.id, "checkout_session_id");
  const paymentId = checkoutSessionId;
  const customerId = requiredString(object.customer, "customer_id");
  const subscriptionId = requiredString(object.subscription, "subscription_id");
  if (object.mode !== "subscription") throw new BridgeError("checkout_mode_mismatch");
  const paymentLinkId = requiredString(object.payment_link, "payment_link_id");
  if (paymentLinkId === FLEXIBLE_LINK_ID) throw new BridgeError("flexible_link_excluded");
  const amount = object.amount_total;
  const currency = requiredString(object.currency, "currency").toLowerCase();
  const paymentStatus = requiredString(object.payment_status, "payment_status").toLowerCase();
  const lineItems = object.line_items?.data;
  if (!Array.isArray(lineItems)) throw new BridgeError("missing:line_items");
  if (lineItems.length !== 2) throw new BridgeError("line_item_count_mismatch");
  const recurring = lineItems.filter((item) => item.price?.type === "recurring");
  const oneTime = lineItems.filter((item) => item.price?.type === "one_time");
  if (recurring.length !== 1 || oneTime.length !== 1) throw new BridgeError("line_items_ambiguous");
  const recurringItem = recurring[0];
  const onboardingItem = oneTime[0];
  const priceId = requiredString(recurringItem.price?.id, "price_id");
  const productId = requiredId(recurringItem.price?.product, "product_id");
  const offer = OFFERS[priceId as keyof typeof OFFERS];
  if (!offer) throw new BridgeError("price_not_allowlisted");
  if (offer.productId !== productId) throw new BridgeError("product_mismatch");
  if (offer.paymentLinkId !== paymentLinkId) throw new BridgeError("payment_link_mismatch");
  if (recurringItem.quantity !== 1 || recurringItem.amount_total !== offer.recurringAmount || recurringItem.price?.recurring?.interval !== "month" || recurringItem.price?.recurring?.interval_count !== 1) {
    throw new BridgeError("subscription_mismatch");
  }
  const onboardingPriceId = requiredString(onboardingItem.price?.id, "onboarding_price_id");
  const onboardingProductId = requiredId(onboardingItem.price?.product, "onboarding_product_id");
  if (onboardingPriceId !== ONBOARDING_PRICE_ID || onboardingProductId !== ONBOARDING_PRODUCT_ID || onboardingItem.quantity !== 1 || onboardingItem.amount_total !== 25000 || onboardingItem.price?.recurring != null) {
    throw new BridgeError("onboarding_mismatch");
  }
  if (offer.amount !== amount || currency !== "usd") throw new BridgeError("amount_or_currency_mismatch");
  if (paymentStatus !== "paid") throw new BridgeError("payment_not_successful");
  return {
    eventId, paymentId, checkoutSessionId, customerId, subscriptionId,
    eventType, route: "payment_confirmed", offer: offer.name,
    email: normalizeEmail(object.customer_details?.email ?? object.customer_email),
    name: object.customer_details?.name?.trim() || null,
    phone: object.customer_details?.phone?.trim() || null,
    priceId, productId, onboardingPriceId, onboardingProductId,
    paymentLinkId, amountCents: amount, currency: "usd",
    paymentStatus, mode: event.livemode ? "live" : "test",
  };
}

export function toGhlPayload(event: NormalizedEvent) {
  return {
    email: event.email,
    name: event.name ?? undefined,
    phone: event.phone ?? undefined,
    queryParams: {
      event_id: event.eventId,
      event_type: event.eventType,
      payment_intent_id: event.paymentId,
      checkout_session_id: event.checkoutSessionId,
      stripe_customer_id: event.customerId,
      stripe_subscription_id: event.subscriptionId,
      payment_status: event.paymentStatus,
      payment_mode: event.mode,
      currency: event.currency,
      amount_total: String(event.amountCents),
      stripe_price_id: event.priceId,
      stripe_product_id: event.productId,
      onboarding_price_id: event.onboardingPriceId,
      onboarding_product_id: event.onboardingProductId,
      payment_link_id: event.paymentLinkId,
      location_id: EEA_LOCATION_ID,
      refund_dispute_status: "none",
      synthetic: event.mode === "test" ? "true" : "false",
    },
  };
}

export async function processEvent(raw: Uint8Array, signature: string, options: {
  signingSecret: string;
  allowLive: boolean;
  requireLive?: boolean;
  store: DedupStore;
  forwarder: Forwarder;
  now?: number;
  enrich?: (raw: Uint8Array) => Promise<Uint8Array>;
}) {
  verifyStripeSignature(raw, signature, options.signingSecret, options.now);
  if (options.requireLive) {
    let envelope: StripeEvent;
    try { envelope = JSON.parse(Buffer.from(raw).toString("utf8")) as StripeEvent; }
    catch { throw new BridgeError("invalid_json"); }
    if (!envelope.livemode) throw new BridgeError("test_mode_rejected");
  }
  const normalizedRaw = options.enrich ? await options.enrich(raw) : raw;
  const event = normalizeStripeEvent(normalizedRaw, options.allowLive);
  if (await options.store.claim(event.eventId, event.paymentId) === "duplicate") return { status: "duplicate" as const, event };
  try {
    await options.forwarder.send(event);
    await options.store.markForwarded(event.eventId);
    return { status: "forwarded" as const, event };
  } catch (error) {
    if (error instanceof AmbiguousForwardError) {
      await options.store.markBlocked(event.eventId, error.message);
      throw new BridgeError("forward_uncertain", 502);
    }
    await options.store.markFailed(event.eventId, error instanceof Error ? error.message : "forward_failed");
    throw new BridgeError("forward_failed", 502);
  }
}
