# openconcho Agent Notes

## CI policy

- PR CI only runs the web checks.
- Rust/Tauri compile-check is local-only for now because the Linux dependency setup on GitHub Actions is too slow for routine PR validation.

## Required local preflight

- Before pushing any change under `packages/desktop/**` or `packages/desktop/src-tauri/**`, run:
  - `pnpm --filter @openconcho/desktop cargo-check`

## Useful commands

- `make ci-web` — matches current PR CI
- `pnpm --filter @openconcho/desktop cargo-check` — local desktop compile check
