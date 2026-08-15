# Rinsha & Sreeni — Wedding Reception

A production-ready, mobile-first digital wedding invitation for Rinsha and Sreeni’s
inter-cultural reception on **17 September 2026 in Chennai**.

The visual language blends Kerala kasavu warmth, Tamil kolam geometry, jasmine,
botanical forms and restrained arch-inspired ornament into one original emblem. It
does not use stock-couple photography or dominant religious symbols.

## Experience

- Cinematic invitation opening with music or quiet entry
- Original lightweight ambient instrumental and persistent fade-controlled player
- Responsive editorial hero and invitation story
- Kerala × Tamil Nadu and Hindu × Muslim cultural fusion narrative
- Mouse, pen and touch scratch-to-reveal card with accessible fallback
- Live IST countdown with event-start and post-event states
- Standards-based downloadable calendar event
- Map-inspired venue card with the exact Google Maps direction URL
- Local/demo blessing garden where wishes become jasmine blooms
- Accessible RSVP flow with attendance choice and guarded guest counter
- Web Share API support with copy-link fallback
- Tamil and Malayalam Unicode touches
- Reduced-motion support, keyboard focus states and semantic form labels
- Open Graph/WhatsApp image, favicon, manifest and complete social metadata
- No analytics, cookies, advertising or user fingerprinting

## Run locally

Requirements: Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

## Verify and build

```bash
npm test
npm run build
npm run preview
```

The production files are written to `dist/`.

## Single source of truth

Names, date, time, timezone, venue, Google Maps URL, share copy and replaceable asset
paths live in:

```text
src/config/weddingConfig.ts
```

Change event information there instead of editing individual components.

## Data architecture

The first release intentionally stores RSVP and blessing submissions on the guest’s
device using local storage. The UI talks only to the interfaces in
`src/services/types.ts`.

To connect Supabase, Firebase, a REST API or a serverless function:

1. Implement `BlessingService` and `RSVPService`.
2. Export the new adapters.
3. Replace the two imports from `localWeddingServices.ts`.

No component redesign is required.

## Replaceable assets

| Asset | Current location | How to replace |
| --- | --- | --- |
| Background music | `public/audio/rinsha-sreeni-ambient.mp3` | Replace with a licensed MP3 or update `assets.music` |
| Social preview | `public/og-image.png` | Replace with a 1200×630 PNG |
| Social preview source | `public/og-image.svg` | Edit and regenerate the PNG |
| Fusion emblem | `src/assets/cultural/fusion-emblem.svg` | Reuse for stationery or replace carefully |
| Couple photos | `src/assets/images/` | Add optimized AVIF/WebP files and set optional config paths |

The included music is original deterministic synthesis created for this project. Its
generator is `scripts/generate_original_audio.py`. The social preview generator is
`scripts/generate_og_image.py`.

## Deployment

### GitHub Pages

The repository includes `.github/workflows/deploy.yml`. In repository settings:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` or run the workflow manually.

Vite automatically uses `/Marriage-Invitation-Site/` as the asset base in GitHub
Actions.

### Vercel

Import the repository. Use:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22

### Netlify

Import the repository. `netlify.toml` already supplies the build command, output
directory and conservative security headers.

## Before sharing publicly

- Replace the canonical and Open Graph URLs in `index.html` if a custom domain is used.
- Confirm the venue details and Maps link once more with both families.
- Connect real persistence if RSVPs must be collected centrally. Local/demo mode does
  **not** send responses to the couple.
- Test the final public URL in WhatsApp’s link preview after deployment.

## Privacy

This site contains no tracking scripts and exposes no credentials. Music preferences,
demo blessings and demo RSVPs remain on the visitor’s device.
