# EEA production payment bridge provenance

Captured: 2026-11-03 (America/New_York)

## Production identity

- Vercel project: `agency-website`
- Production deployment: `8AmTM2QXVG5XoVs9vrVNXdKj8dBc`
- Production source commit: `8446b85fb1935f8056e4a34d4ec5cf17617f0504`
- Source tree: `df5eeaabdb8b13abeb9be8572b2944a9ef85ffbf`
- Source branch: `codex/eea-production-recovery-phase5`
- Rollback deployment: `78gzMwHdR1KkQP9QXjDS1N1FfL76`
- Production route inventory includes: `/api/eea/stripe-webhook`

The Vercel deployment details identify the same full Git commit that is present in the local repository and the remote recovery branch. The payment implementation was not modified during provenance capture.

## Reviewed implementation hashes (SHA-256)

| File | SHA-256 |
| --- | --- |
| `app/api/eea/stripe-webhook/route.ts` | `2fa355ba8cba074ac25f0154ec0f00351ad2ad0c15035d08a4833932b21a903c` |
| `lib/eea-ghl-client.ts` | `d25b729b7689dba3f02b63f93d4947aa55c5837cc0c969c08e0bade9fd228f40` |
| `lib/eea-stripe-bridge.ts` | `f02284394f981420a3616a473a4815837821dd158947b9b7e337837c3ba47517` |
| `lib/eea-stripe-postgres.ts` | `943b6445b47ec5d1b7bb6db659befe6322ec0c3b2352d6346f39f22fb909bec9` |
| `tests/eea-ghl-client.test.ts` | `320d11046c4ed33ec9795b338b3bf1ef1b95e6ecc9e97af8615186f429f52dfa` |
| `tests/eea-stripe-bridge.test.ts` | `cafa64e0d6ff6bdb317faef754879aeb9f9689c964b2165924a3b5952196477d` |
| `tests/run-deployed-bridge-fixtures.mjs` | `8f4f444cf8ecec515a0aad9460c6e38a75d33a60aaed683edd594631c9a7e9f4` |
| `package.json` | `cdd5d91683df1b1384af709f65abbae05cc356dd74ac76e6eea110a4f8b9a309` |
| `pnpm-lock.yaml` | `7c0e9a9111268cae4d107e6bb3cd875e87d2bdf5e1bcf70cdf6684f9af2171` |

## Recovery

The corresponding Git commit and tree are sufficient to recreate the reviewed source. A Git bundle captured from the remote-backed recovery branch is stored outside the working tree in the workspace audit artifacts. No credential values, environment values, database contents, or customer data are included in this record.

## Governance gate

At capture time, GitHub reported that `main` was not protected. The production bridge must not be merged into `main` until the P0-3 branch-protection, independent-review, and required-CI controls are enforced.
