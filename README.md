<div align="center">

# KishView

### Interactive 3D Map, Online Ticket Booking & Complete Travel Guide for Kish Island, Iran

[![Demo](https://img.shields.io/badge/Live_Demo-alirewa.github.io%2Fkishview-0ea5e9?style=flat-square)](https://alirewa.github.io/kishview/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-4.7-396AF3?style=flat-square)](https://maplibre.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license)

</div>

---

## About

**KishView** is a full-featured web application for discovering and exploring **Kish Free Zone Island** in the Persian Gulf, Iran. It combines an interactive 3D map, online ticket purchasing, and a bilingual travel guide into a single progressive web app.

**Kish Island — Key Facts:**
- Area: 91.5 km² in the Persian Gulf
- Annual visitors: 2+ million tourists
- Visa-free: up to 14 days for foreign nationals
- 24+ attractions mapped with real GPS coordinates

---

## Features

### Interactive 3D Map
- 60° pitch 3D map with real building extrusions
- Three map styles: Standard / Dark / Satellite
- Auto GPS geolocation on load
- Live search across all mapped places
- Category filters: Shopping, Hotels, Water Sports, Historical, Entertainment, Cafes

### Online Ticket Booking
- Buy tickets for Dolphin Park, Aquarium, Bird Garden, Snow Park and more
- Persian (Jalali/Shamsi) date picker
- Smart cart with discount code support
- Card-to-card payment with unique auto-verification amount

### Bilingual Persian / English UI
- Full RTL support for Persian, LTR for English
- Language toggle with mirrored layout

### PWA — Installable
- Offline-capable via Service Worker
- Installable as a native-like app on iOS and Android

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router + TypeScript |
| Map | MapLibre GL JS 4.7 + react-map-gl |
| State | Zustand (persist middleware) |
| Styling | Tailwind CSS 3 + tailwindcss-rtl |
| Animation | Framer Motion |
| Auth | NextAuth.js v4 (admin panel) |
| PWA | next-pwa |
| Date Picker | react-multi-date-picker (Jalali/Persian) |

---

## Project Structure

```
src/
├── app/
│   ├── (site)/          # Public pages: tickets, cart, checkout, about, contact
│   ├── map/             # Interactive 3D map page
│   ├── admin/           # Admin panel (restricted)
│   └── api/             # API routes: orders, tickets, places
├── components/
│   ├── Map/             # KishMap, MarkerLayer, darkStyle
│   ├── controls/        # TopBar, CategoryFilter, MenuDrawer, MapControlsPanel
│   ├── landing/         # Hero, Stats, Features, Tickets, Map sections
│   └── Overlay/         # PlaceSidebar, PlaceInfoSheet
├── data/
│   └── places.ts        # 24+ places with real GPS coordinates
├── store/
│   └── useAppStore.ts   # Zustand: theme, language, mapStyle, selectedPlace
└── types/               # TypeScript interfaces
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/map` | Interactive 3D map |
| `/tickets` | Ticket listing |
| `/tickets/[id]` | Ticket detail & purchase |
| `/cart` | Shopping cart |
| `/checkout` | Checkout & payment |
| `/about` | About KishView |
| `/contact` | Contact |

---

## License

© Alirewa — All rights reserved.  
This is a proprietary project. Unauthorized use, copying, or distribution is prohibited.

---

<div align="center">
  <sub>Built for Kish Island, Persian Gulf, Iran</sub>
</div>
