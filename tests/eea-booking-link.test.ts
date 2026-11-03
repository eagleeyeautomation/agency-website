import assert from "node:assert/strict";
import test from "node:test";

import {
  consultationBookingUrl,
  getContactDetails,
} from "../app/site-content";

test("consultation CTAs default to the verified active GHL calendar", () => {
  const previousBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  try {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;

    assert.equal(
      consultationBookingUrl,
      "https://api.leadconnectorhq.com/widget/booking/OExPCFbbYbQmrKf7pymD",
    );
    assert.equal(getContactDetails().bookingHref, consultationBookingUrl);
  } finally {
    if (previousBookingUrl === undefined) {
      delete process.env.NEXT_PUBLIC_BOOKING_URL;
    } else {
      process.env.NEXT_PUBLIC_BOOKING_URL = previousBookingUrl;
    }
  }
});

test("a blank deployment override cannot disconnect the consultation calendar", () => {
  const previousBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  try {
    process.env.NEXT_PUBLIC_BOOKING_URL = "   ";
    assert.equal(getContactDetails().bookingHref, consultationBookingUrl);
  } finally {
    if (previousBookingUrl === undefined) {
      delete process.env.NEXT_PUBLIC_BOOKING_URL;
    } else {
      process.env.NEXT_PUBLIC_BOOKING_URL = previousBookingUrl;
    }
  }
});

test("an approved booking URL override remains supported", () => {
  const previousBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  try {
    process.env.NEXT_PUBLIC_BOOKING_URL = "https://example.com/approved-calendar";
    assert.equal(
      getContactDetails().bookingHref,
      "https://example.com/approved-calendar",
    );
  } finally {
    if (previousBookingUrl === undefined) {
      delete process.env.NEXT_PUBLIC_BOOKING_URL;
    } else {
      process.env.NEXT_PUBLIC_BOOKING_URL = previousBookingUrl;
    }
  }
});
