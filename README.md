<div align="center">

# کیش ویو | KishView

### نقشه تعاملی سه‌بعدی، خرید بلیت آنلاین و راهنمای جامع جزیره آزاد کیش
**Interactive 3D Map · Online Tickets · Complete Guide for Kish Free Zone Island**

---

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-4.7-396AF3?style=flat-square)](https://maplibre.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license)

> در حال توسعه — به زودی روی دامنه اختصاصی در دسترس خواهد بود

</div>

---

## درباره پروژه

**کیش ویو** یک اپلیکیشن وب پیشرفته برای کشف و تجربه جزیره آزاد کیش است. با نقشه سه‌بعدی تعاملی، می‌توانید جاذبه‌ها، هتل‌ها، رستوران‌ها و خدمات جزیره را کشف کنید — و بلیت مکان‌های تفریحی را مستقیماً آنلاین خریداری کنید.

**جزیره آزاد کیش — آمار واقعی:**
- 🏝 مساحت: ۹۱.۵ کیلومتر مربع در خلیج فارس
- 👥 گردشگر سالانه: بیش از ۲ میلیون نفر
- 🌍 بدون ویزا: تا ۱۴ روز برای اتباع خارجی
- 🗺 بیش از ۲۴ جاذبه ثبت‌شده روی نقشه

---

## ✨ ویژگی‌های اصلی

### 🗺 نقشه تعاملی سه‌بعدی
- نقشه ۳D با زاویه ۶۰ درجه و ساختمان‌های واقعی
- سه حالت نقشه: معمولی / دارک / ماهواره‌ای
- موقعیت‌یابی خودکار کاربر (GPS)
- فیلتر دسته‌بندی: خرید، هتل، ورزش آبی، تاریخی، تفریح، کافه
- جستجوی زنده مکان‌ها

### 🎫 خرید بلیت آنلاین
- بلیت پارک دلفین، آکواریوم، باغ پرندگان و بیشتر
- انتخاب‌گر تاریخ شمسی (جلالی)
- سبد خرید با کد تخفیف
- پرداخت کارت به کارت با کد تأیید خودکار منحصربه‌فرد

### 🌐 دوزبانه فارسی / انگلیسی
- RTL/LTR بر اساس زبان انتخابی
- رابط کاربری کاملاً فارسی و انگلیسی

### 📱 PWA — نصب‌پذیر روی موبایل
- کارایی آفلاین با Service Worker
- نصب مانند اپ نیتیو روی iOS و اندروید

---

## About KishView (English)

**KishView** is an advanced web application for discovering and experiencing **Kish Free Zone Island**, Iran. Browse the interactive 3D map, explore 24+ registered attractions, and purchase tickets for top venues directly online.

**Kish Island — Key Facts:**
- 🏝 Area: 91.5 km² in the Persian Gulf
- 👥 Annual visitors: 2+ million tourists
- 🌍 Visa-free: up to 14 days for foreign nationals
- 🗺 24+ attractions mapped with real GPS coordinates

### Key Features
- **3D Interactive Map** — 60° pitch, real buildings, 3 map styles (light / dark / satellite), auto GPS
- **Online Ticket Booking** — Dolphin Park, Aquarium, Bird Garden + more; Jalali (Shamsi) date picker
- **Smart Cart** — discount codes, unique auto-verification payment amount
- **Bilingual UI** — full Persian (RTL) and English (LTR) with mirrored layout
- **PWA** — installable on iOS and Android, offline-capable

---

## 🛠 تکنولوژی‌ها | Tech Stack

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

## 📂 ساختار پروژه | Project Structure

```
src/
├── app/
│   ├── (site)/          # صفحات عمومی: tickets, cart, checkout, about, contact
│   ├── map/             # نقشه تعاملی سه‌بعدی
│   ├── admin/           # پنل مدیریت (محدود)
│   └── api/             # API routes: orders, tickets, places
├── components/
│   ├── Map/             # KishMap, MarkerLayer, darkStyle
│   ├── controls/        # TopBar, CategoryFilter, MenuDrawer, MapControlsPanel
│   ├── landing/         # LandingHero, Stats, Features, Tickets, Map sections
│   └── Overlay/         # PlaceSidebar, PlaceInfoSheet
├── data/
│   └── places.ts        # ۲۴+ مکان با مختصات واقعی GPS
├── store/
│   └── useAppStore.ts   # Zustand: theme, language, mapStyle, selectedPlace
└── types/               # TypeScript interfaces
```

---

## 🎯 صفحات | Pages

| مسیر | توضیح |
|---|---|
| `/` | صفحه اصلی — landing page |
| `/map` | نقشه تعاملی سه‌بعدی |
| `/tickets` | لیست بلیت‌های آنلاین |
| `/tickets/[id]` | جزئیات و خرید بلیت |
| `/cart` | سبد خرید |
| `/checkout` | تسویه حساب + پرداخت |
| `/about` | درباره کیش ویو |
| `/contact` | تماس با ما |

---

## License

© Alirewa — All rights reserved.  
This is a proprietary project. Unauthorized use, copying, or distribution is prohibited.

---

<div align="center">
  <sub>Built with ❤️ for Kish Island — جزیره آزاد کیش</sub>
</div>
