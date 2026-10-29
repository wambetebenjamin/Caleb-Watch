# Caleb Watch

**See early. Act together.**

Caleb Watch offers simple tools for community early-warning relays, preparedness drills and information sharing so schools, churches and local groups can act before a crisis deepens.

## Requirements

- Node.js 24 or newer (`.nvmrc` is pinned to 24)
- npm 10 or newer

All application dependencies are pinned to exact versions in `package.json` and `package-lock.json`.

## Run locally

```sh
nvm use
npm ci
npm run dev
```

The development server binds to `0.0.0.0`. The site is available at the port printed by Next.js.

## Build gate

```sh
npm run typecheck
npm run lint
npm run build
```

or run all three with `npm run check`.

## Pages and features

- Home, hazard primers, relay setup, school and church drills, message and poster templates, regional examples, community registration, about, method, contact, privacy, terms and local group notes.
- English, Kiswahili and French interface language selection. The preference is saved in browser storage.
- Voice tour using the browser's built-in speech synthesis.
- WhatsApp contact link: `+254 112 272 061`.
- Essential preference key: `caleb-watch-cookie-consent`.
- Saved templates, drill checklist progress, group notes and local-only registration details remain in the visitor's browser. This is not an account system and the local note pad is not encrypted or synced.
- No live sensor feeds, official alerts or analytics dashboards.

## Secure community registration

The join form supports Google reCAPTCHA v3 verification. If no site key is present, the form explicitly operates in browser-only mode. For server verification, set both `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` in the deployment environment.

Optional persistent registration storage is provided through Supabase REST. Apply `supabase/schema.sql`, then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the server environment. Never expose the service role key to a browser. Without those values, verified submissions are saved on the visitor's device only.

See `.env.example` for variable names. Do not commit secrets.

## Deployment

`vercel.json` sets the Next.js framework, `cdg1` region, install and build commands. `next.config.ts` adds security headers and allows the Google reCAPTCHA resources required by the registration form. Set deployment secrets in Vercel before enabling secure group registrations.

## Template and photographs

The layout classes, original stylesheets, typography and template fonts are preserved from the uploaded `aznews-master.zip` home-page assets. The app imports the original `style.css`, Bootstrap, Font Awesome, Themify and Flaticon assets without editing the source theme stylesheet. Caleb Watch application content uses those existing template styles and adds responsive behavior and accessible controls.

All site photography is real Pexels photography. See [image-credits.md](./image-credits.md) for the photographer and source page for every local image.

## Safety notice

Community preparedness information only. Caleb Watch is not an official government warning service or meteorological agency. Always follow national alerts and local authorities. No guarantee of coverage or accuracy.
