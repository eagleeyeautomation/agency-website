# Agency Website Deployment

This repository is ready for Vercel deployment as the public Eagle Eye Automation website.

## Runtime

- Node.js: `>=20.9.0`
- Package manager: `pnpm@11.7.0`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Check command: `pnpm check`

## Environment

Copy `.env.example` into the Vercel project settings.

```bash
NEXT_PUBLIC_SITE_URL=https://www.eagleeyeautomation.com/
NEXT_PUBLIC_CONTACT_EMAIL=hello@eagleeyeautomation.com
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_BOOKING_URL=https://api.leadconnectorhq.com/widget/booking/OExPCFbbYbQmrKf7pymD
```

`NEXT_PUBLIC_BOOKING_URL` may override the verified EEA Consultation calendar only when an approved replacement calendar is deployed. Add `NEXT_PUBLIC_CONTACT_PHONE` when the public phone number is ready to display.

## Vercel Setup

1. Import `eagleeyeautomation/agency-website`.
2. Select the Next.js framework preset.
3. Set the install and build commands above.
4. Add the environment variables.
5. Deploy from `main`.

## Preflight

Run this before promoting a deployment:

```bash
pnpm install --frozen-lockfile
pnpm check
```
