import type { Place } from '@/types';

export const places: Place[] = [
  {
    id: 'coral-beach',
    category: 'water-sports',
    coordinates: [53.958, 26.5455],
    name: { fa: 'ساحل مرجانی', en: 'Coral Beach' },
    description: {
      fa: 'یکی از زیباترین سواحل جزیره کیش با آب‌های فیروزه‌ای شفاف و مرجان‌های رنگارنگ. مناسب برای شنا، غواصی و اسنورکل.',
      en: 'One of Kish Island\'s most beautiful beaches with crystal-clear turquoise waters and colorful coral reefs. Perfect for swimming, diving, and snorkeling.',
    },
    guide: {
      fa: 'بهترین زمان بازدید: صبح زود یا غروب آفتاب. تجهیزات غواصی و اسنورکل در ساحل موجود است. ورود با لباس شنا الزامی است.',
      en: 'Best time to visit: early morning or at sunset. Diving and snorkeling equipment available on-site. Swimwear required for entry.',
    },
    images: [
      { src: '/images/coral-beach-1.jpg', alt: 'Coral Beach Kish' },
      { src: '/images/coral-beach-2.jpg', alt: 'Coral Beach underwater' },
    ],
    ticketUrl: 'https://example.com/tickets/coral-beach',
  },
  {
    id: 'dolphin-park',
    category: 'water-sports',
    coordinates: [53.972, 26.565],
    name: { fa: 'پارک دلفین‌ها', en: 'Dolphin Park' },
    description: {
      fa: 'پارک آبی منحصربه‌فرد با نمایش دلفین‌ها، شیرهای دریایی و امکانات شنا در استخرهای گرمایش‌دار.',
      en: 'Unique water park featuring dolphin shows, sea lion performances, and heated swimming pools for the whole family.',
    },
    guide: {
      fa: 'ساعات کاری: ۹ صبح تا ۱۰ شب. خرید بلیط آنلاین توصیه می‌شود. پارکینگ رایگان موجود است.',
      en: 'Hours: 9 AM – 10 PM. Online ticket purchase recommended. Free parking available.',
    },
    images: [
      { src: '/images/dolphin-park-1.jpg', alt: 'Dolphin Park Kish' },
      { src: '/images/dolphin-park-2.jpg', alt: 'Dolphin show' },
    ],
    ticketUrl: 'https://example.com/tickets/dolphin-park',
  },
  {
    id: 'greek-ship',
    category: 'amenity',
    coordinates: [53.942, 26.535],
    name: { fa: 'کشتی یونانی', en: 'Greek Ship' },
    description: {
      fa: 'لنگر گاه تاریخی کشتی یونانی که از سال ۱۳۴۵ در ساحل جزیره کیش به گِل نشسته و به یکی از جاذبه‌های گردشگری معروف تبدیل شده است.',
      en: 'Historic grounding site of a Greek cargo ship since 1966, now one of Kish Island\'s most iconic tourist landmarks and photography spots.',
    },
    guide: {
      fa: 'بازدید رایگان. بهترین زمان: غروب آفتاب برای عکاسی. مراقب امواج بلند باشید.',
      en: 'Free entry. Best time: sunset for photography. Be cautious of high waves near the shore.',
    },
    images: [
      { src: '/images/greek-ship-1.jpg', alt: 'Greek Ship Kish sunset' },
      { src: '/images/greek-ship-2.jpg', alt: 'Greek Ship aerial view' },
    ],
  },
  {
    id: 'venus-mall',
    category: 'restaurant',
    coordinates: [53.963, 26.558],
    name: { fa: 'مال ونوس', en: 'Venus Mall' },
    description: {
      fa: 'بزرگترین مرکز خرید جزیره کیش با بیش از ۲۰۰ برند، رستوران‌های متنوع، سینما و امکانات تفریحی.',
      en: 'Kish Island\'s largest shopping center featuring 200+ brands, diverse restaurants, cinema, and entertainment facilities.',
    },
    guide: {
      fa: 'ساعات کاری: ۱۰ صبح تا ۱۲ شب. طبقه سوم شامل فودکورت با انواع غذاهای ایرانی و بین‌المللی.',
      en: 'Hours: 10 AM – midnight. Third floor features a food court with Iranian and international cuisine.',
    },
    images: [
      { src: '/images/venus-mall-1.jpg', alt: 'Venus Mall Kish' },
    ],
  },
  {
    id: 'harireh-ancient',
    category: 'amenity',
    coordinates: [53.935, 26.562],
    name: { fa: 'شهر باستانی حریره', en: 'Harireh Ancient City' },
    description: {
      fa: 'بقایای شهر باستانی حریره متعلق به قرن دوم هجری، یکی از با ارزش‌ترین آثار تاریخی خلیج فارس.',
      en: 'Ruins of the ancient city of Harireh dating back to the 8th century, one of the most historically significant sites in the Persian Gulf.',
    },
    guide: {
      fa: 'بازدید رایگان. بهترین زمان: اوایل صبح یا عصر. راهنمای تور موجود است.',
      en: 'Free admission. Best time: early morning or late afternoon. Guided tours available.',
    },
    images: [
      { src: '/images/harireh-1.jpg', alt: 'Harireh Ancient City' },
      { src: '/images/harireh-2.jpg', alt: 'Harireh ruins aerial' },
    ],
  },
  {
    id: 'kish-cafe-rose',
    category: 'cafe',
    coordinates: [53.969, 26.552],
    name: { fa: 'کافه رز', en: 'Café Rose' },
    description: {
      fa: 'کافه‌ای دنج با منظره دریا، سرو انواع قهوه تخصصی، دسرهای محلی و اتمسفر آرام‌بخش.',
      en: 'Cozy beachfront café with sea views, specialty coffee, local desserts, and a relaxing atmosphere.',
    },
    guide: {
      fa: 'ساعات کاری: ۷ صبح تا ۱۱ شب. رزرو میز برای غروب توصیه می‌شود.',
      en: 'Hours: 7 AM – 11 PM. Table reservation recommended for sunset hours.',
    },
    images: [
      { src: '/images/cafe-rose-1.jpg', alt: 'Café Rose Kish' },
    ],
  },
  {
    id: 'kish-bowling',
    category: 'land-sports',
    coordinates: [53.975, 26.57],
    name: { fa: 'بولینگ کیش', en: 'Kish Bowling Center' },
    description: {
      fa: 'مدرن‌ترین مرکز بولینگ جنوب کشور با ۲۴ لاین حرفه‌ای، بیلیارد، پینگ‌پنگ و امکانات تفریحی کامل.',
      en: 'The most modern bowling center in southern Iran with 24 professional lanes, billiards, table tennis, and full recreational facilities.',
    },
    guide: {
      fa: 'ساعات کاری: ۱۰ صبح تا ۲ بامداد. رزرو آنلاین در اوقات شلوغ توصیه می‌شود.',
      en: 'Hours: 10 AM – 2 AM. Online reservation recommended during peak hours.',
    },
    images: [
      { src: '/images/bowling-1.jpg', alt: 'Kish Bowling Center' },
    ],
    ticketUrl: 'https://example.com/tickets/kish-bowling',
  },
];
