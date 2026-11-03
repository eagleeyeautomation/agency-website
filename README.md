# Agency Website

Official website and marketing platform for Eagle Eye Automation.

## Local Development

```bash
pnpm install
pnpm dev
```

## Production

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm start
```

## Deployment

This app is ready for Vercel or any Node host that supports Next.js.

- Node.js: `>=20.9.0`
- Package manager: `pnpm@11.7.0`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Check command: `pnpm check`
- Start command: `pnpm start`

Set these environment variables in the deployment target:

```bash
NEXT_PUBLIC_SITE_URL=https://www.eagleeyeautomation.com/
NEXT_PUBLIC_CONTACT_EMAIL=hello@eagleeyeautomation.com
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_BOOKING_URL=https://api.leadconnectorhq.com/widget/booking/OExPCFbbYbQmrKf7pymD
```

`NEXT_PUBLIC_BOOKING_URL` may override the verified EEA Consultation calendar only when an approved replacement calendar is deployed. Add `NEXT_PUBLIC_CONTACT_PHONE` when you want a phone number shown in the contact and footer areas.

The homepage content lives in `app/page.tsx`, global styling in `app/globals.css`, and project imagery in `public/images`.

See `DEPLOYMENT.md` for the full Vercel deployment checklist.

## Related Repositories

- `eagleeyeautomation/prn-command-center`: internal PRN operations dashboard
- `eagleeyeautomation/ghl-workflows`: GoHighLevel workflow documentation and deployment registry
- `eagleeyeautomation/automation-library`: reusable automation patterns and templates
