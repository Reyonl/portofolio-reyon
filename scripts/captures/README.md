# Capture scripts — provenance of /images/*.jpg

Every screenshot in `public/images/` was produced by these scripts against the
developer's own local machines. They are kept in-repo so a reader can re-derive
how each image was made (same principle as the evidence registry).

| Image | Script | Source |
|-------|--------|--------|
| `warung-*.jpg` | `warung-web.mjs` (or `all-captures.mjs`) | Warung Lupi web, `php artisan serve --port=8000` in `C:/laragon/www/Rekapan_Warung`, dev DB |
| `dailyco-hero.jpg` | `all-captures.mjs` | DAILY.CO, `php artisan serve --port=8001` in `C:/laragon/www/percobaanskripsi_1` |
| `hermes-terminal.jpg` | `hermes-terminal.mjs` | `hermes-devops status` real output (v0.7.5), re-typeset 1:1 into a terminal frame |

Prereqs: the app's dev server running, `playwright` available
(reused from `C:/laragon/www/Rekapan_Warung/node_modules`), and output dir as
argv[2]. Example:

```bash
cd C:/laragon/www/Rekapan_Warung
node C:/laragon/www/portofolio-reyon/scripts/captures/warung-web.mjs C:/laragon/www/portofolio-reyon/public/images
```

After re-capturing, update `media[].width/height` in the content registry —
the schema gate fails the build when natural sizes drift from reality.
