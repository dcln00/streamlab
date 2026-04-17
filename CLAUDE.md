# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Nuxt dev server
- `npm run build` — production build (Nitro `vercel` preset)
- `npm run generate` — static generation
- `npm run preview` — preview built output
- `npm run postinstall` — runs `nuxt prepare` (regenerates `.nuxt/` types; run manually after editing `nuxt.config.ts` if type errors appear)

No test or lint scripts are configured.

## Architecture

Nuxt 4 SPA scaffold for a video-streaming app ("Streamlab"). The app lives under `app/` (Nuxt 4's `srcDir` convention), not the project root.

- **Templating**: Every Vue SFC uses `<template lang="pug">`. `vite-plugin-pug` is a devDependency but is **not** registered in `nuxt.config.ts` — Pug works today because Nuxt/Vite resolves the `pug` compiler via `vue-loader`/`@vue/compiler-sfc`. Use tab indentation inside Pug blocks to match existing files.
- **Styling**: Tailwind CSS v4 via `@nuxtjs/tailwindcss` beta. Global theme tokens (e.g. `--color-brand-accent`) and custom utilities (`container`, `font-oswald`) are defined with `@theme` / `@utility` directives in `app/assets/css/tailwind.css`. No `tailwind.config.js` — extend the design system in that CSS file.
- **Fonts**: `@nuxt/fonts` auto-loads weights 100–900; fonts are referenced by name only in CSS (`Jost`, `Oswald`). Don't add `<link>` tags manually.
- **State & meta**: Site-wide metadata lives in the `useMeta` composable (`app/composables/useMeta.ts`), backed by `useState("meta", …)` so SSR and client share one source. `app.vue` drives `useHead` / `useSeoMeta` from it — update the composable, not the head calls, when changing site name/description.
- **Runtime config**: `runtimeConfig` in `nuxt.config.ts` exposes `apiKey` / `apiBaseUrl` (server-only) and `public.imgBaseUrl` / `public.imgBackdropBaseUrl` (client-safe). Values are injected from `NUXT_*` env vars — see `.env.example`. This is the TMDB-style image-URL pattern; expect a media/catalog API to be wired through these.
- **Nitro quirk**: `hooks['nitro:config']` overrides Nitro's import-collision warning to silence the `"Duplicated imports"` message only. Leave other warnings visible.
- **Deploy target**: `nitro.preset: "vercel"` — builds emit Vercel output. The project is expected to deploy to Vercel.

## Conventions specific to this repo

- Each SFC starts with a `// path/to/file.vue` comment on line 1 (outside the `<script>` block). New files follow this.
- Components are referenced in Pug with kebab-case tags (`app-header`, `app-footer`) — Nuxt auto-imports them from `app/components/`.
- Tab indentation throughout (`.vue`, `.ts`, Pug). Keep it consistent; Tailwind's v4 CSS file also uses tabs.
