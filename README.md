<div align="center">

# 🗺️ Kish Map — نقشه تعاملی کیش

**An interactive 3D tourism map for Kish Island, Iran**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Mapbox GL JS](https://img.shields.io/badge/Mapbox_GL_JS-3-4264fb?style=flat-square&logo=mapbox)](https://mapbox.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license--copyright)

</div>

---

## Overview

**Kish Map** is a premium, single-page interactive tourism application built exclusively for Kish Island, Iran. It delivers a fully immersive **3D map experience** with curated local attractions, water sports, restaurants, cafés, and activity points — all within a seamless, native-app-quality interface.

The application never leaves the map view. Every interaction — place details, ticket purchasing, language switching, and theme toggling — happens as a smooth overlay on top of the live map.

---

## Features

- **🌍 3D Interactive Map** — Click any marker to fly into a cinematic 3D view (pitch 60°, zoom 17) with smooth Mapbox GL JS animation
- **📍 Category Markers** — Water sports, land sports, restaurants, cafés, and amenities with custom icons
- **📋 Rich Place Overlays** — Descriptions, image galleries, usage guides, and direct ticket purchasing via a vaul right-side drawer
- **🌐 Bilingual UI** — Full Farsi (RTL) and English (LTR) support with a single tap
- **🌙 Dark & Light Mode** — Spring-animated sun/moon toggle, preference persisted in localStorage
- **🔒 Bounds Restricted** — Map is locked to Kish Island; users cannot pan or zoom away
- **📝 Business Registration** — Minimal admin-contact modal for local businesses (no form, no friction)
- **📱 Mobile-First** — All touch targets ≥ 44×44px, overscroll-contain, responsive at 375px–1440px

---

## GitHub Topics

`kish-island` `interactive-map` `3d-map` `tourism` `mapbox-gl` `nextjs` `react` `typescript` `tailwindcss` `farsi` `rtl` `dark-mode` `iran` `spa` `persian-gulf`

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org) | 14 | SPA framework — static export |
| [Mapbox GL JS](https://mapbox.com) | 3 | 3D map engine, flyTo, terrain DEM |
| [react-map-gl](https://visgl.github.io/react-map-gl/) | 7 | React bindings for Mapbox |
| [TypeScript](https://typescriptlang.org) | 5 | Full type safety |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Styling — dark: and rtl: variants |
| [Zustand](https://github.com/pmndrs/zustand) | 4 | Lightweight state management |
| [Framer Motion](https://framer.com/motion) | 11 | Spring-physics animations |
| [vaul](https://vaul.emilkowal.ski/) | 0.9 | Drawer / sidebar component |
| [Radix UI Dialog](https://radix-ui.com/primitives/docs/components/dialog) | 1.1 | Accessible modal |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Mapbox](https://account.mapbox.com/auth/signup/) account (public token)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Alirewa/kish-map.git
cd kish-map

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your Mapbox public token:
# NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
# Static output is generated in the /out directory
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Entry — dynamic import (no SSR)
│   └── globals.css         # Tailwind directives + CSS variables
├── components/
│   ├── Map/
│   │   ├── KishMap.tsx     # Core map (bounds, terrain, flyTo)
│   │   ├── MarkerLayer.tsx # Category markers
│   │   └── mapConfig.ts    # Constants (center, bounds, zoom)
│   ├── Overlay/
│   │   ├── PlaceSidebar.tsx    # vaul right-side drawer
│   │   └── BuyTicketButton.tsx # Orange gradient CTA
│   ├── UI/
│   │   ├── TopBar.tsx          # Glassmorphism floating navbar
│   │   ├── ThemeToggle.tsx     # Animated dark/light toggle
│   │   ├── LanguageToggle.tsx  # FA/EN pill button
│   │   └── AddPlaceButton.tsx  # Corner ghost button
│   ├── Modals/
│   │   └── AddPlaceModal.tsx   # Radix Dialog info modal
│   ├── ui/
│   │   ├── drawer.tsx          # vaul primitive wrapper
│   │   └── dialog.tsx          # Radix Dialog wrapper
│   └── MapPage.tsx             # Client root (theme sync)
├── store/
│   └── useAppStore.ts      # Zustand (persists theme + language)
├── context/
│   └── LanguageContext.tsx # RTL/LTR + translation provider
├── locales/
│   ├── fa.ts               # Farsi strings
│   └── en.ts               # English strings
├── data/
│   └── places.ts           # Kish Island place objects
├── types/
│   └── index.ts            # TypeScript interfaces
└── lib/
    └── utils.ts            # cn() utility
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | ✅ | Your Mapbox GL JS public access token |

---

## License & Copyright

```
Copyright © 2024 @Alirewa. All Rights Reserved.

This is a proprietary project. The concept, design, data curation, branding,
and source code of Kish Map are the exclusive intellectual property of @Alirewa.

Unauthorized copying, reproduction, distribution, modification, reverse-engineering,
sublicensing, or commercial use of any part of this project — in whole or in part —
is strictly prohibited without prior written permission from the author.

This project represents a significant personal investment of time, research, domain
expertise, and creative effort. Respect intellectual property.

For licensing inquiries, contact the author directly via GitHub.
```

---

<div align="center">
  <strong>Designed &amp; Developed by <a href="https://github.com/Alirewa">@Alirewa</a></strong>
</div>
