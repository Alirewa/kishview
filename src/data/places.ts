import type { Place } from '@/types';

export const places: Place[] = [
  // ──────────────────────────────────────────────────────────────
  // Mikamall — flagship shopping centre
  // ──────────────────────────────────────────────────────────────
  {
    id: 'mikamall',
    category: 'shopping',
    coordinates: [53.9718, 26.5508],
    name: { fa: 'میکامال', en: 'Mikamall' },
    address: {
      fa: 'جزیره کیش، بلوار ساحلی شهید چمران، میکامال',
      en: 'Kish Island, Shahid Chamran Coastal Blvd, Mikamall',
    },
    description: {
      fa: 'میکامال بزرگ‌ترین و مدرن‌ترین مرکز خرید جزیره کیش است. با زیربنای بیش از ۱۲۰٬۰۰۰ متر مربع و بیش از ۲۵۰ برند معتبر داخلی و بین‌المللی، این مجموعه شامل پارک آبی سرپوشیده، سینما، فودکورت چند طبقه، و بزرگ‌ترین اسکیت‌پارک سرپوشیده ایران است.',
      en: 'Mikamall is the largest and most modern shopping complex on Kish Island. Spanning over 120,000 m² with 250+ domestic and international brands, it hosts an indoor water park, cinema, multi-level food court, and Iran\'s largest indoor skate park.',
    },
    guide: {
      fa: 'ساعات کاری: ۱۰ صبح تا ۱ بامداد. پارکینگ رایگان با ظرفیت ۳٬۰۰۰ خودرو. دسترسی با تاکسی آبی یا سرویس اتوبوس رایگان از اسکله.',
      en: 'Hours: 10 AM – 1 AM. Free parking for 3,000 vehicles. Accessible by Kish blue taxi or free shuttle from the pier.',
    },
    images: [
      { src: 'https://picsum.photos/seed/mikamall1/800/500', alt: 'Mikamall Kish' },
      { src: 'https://picsum.photos/seed/mikamall2/800/500', alt: 'Mikamall interior' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // Dariush Grand Hotel
  // ──────────────────────────────────────────────────────────────
  {
    id: 'dariush-hotel',
    category: 'hotel',
    coordinates: [53.9350, 26.5770],
    name: { fa: 'هتل بزرگ داریوش', en: 'Dariush Grand Hotel' },
    address: {
      fa: 'جزیره کیش، شمال جزیره، بلوار داریوش',
      en: 'Kish Island, North Coast, Dariush Boulevard',
    },
    description: {
      fa: 'هتل بزرگ داریوش با الهام از معماری باشکوه تخت‌جمشید، نمادین‌ترین سازه جزیره کیش است. ستون‌های عظیم به سبک هخامنشی، کنده‌کاری‌های طلایی و کلاس جهانی این هتل را به یکی از تصویرشناخته‌ترین هتل‌های ایران تبدیل کرده‌اند.',
      en: 'Inspired by the grandeur of Persepolis, Dariush Grand Hotel is Kish\'s most iconic structure. Massive Achaemenid-style columns, golden reliefs, and world-class amenities make it one of Iran\'s most photographed hotels.',
    },
    guide: {
      fa: 'رزرو از وب‌سایت هتل یا از طریق آژانس‌های گردشگری مجاز. رستوران‌های هتل برای غیرمهمانان نیز باز است. تور معماری هتل هر روز ساعت ۱۰ صبح برگزار می‌شود.',
      en: 'Reserve via the hotel website or licensed travel agencies. Hotel restaurants are open to non-guests. Architecture tours run daily at 10 AM.',
    },
    images: [
      { src: 'https://picsum.photos/seed/dariush1/800/500', alt: 'Dariush Grand Hotel Kish' },
      { src: 'https://picsum.photos/seed/dariush2/800/500', alt: 'Dariush Hotel columns' },
    ],
    ticketUrl: 'https://kishview.com',
  },

  // ──────────────────────────────────────────────────────────────
  // Kish Aquarium
  // ──────────────────────────────────────────────────────────────
  {
    id: 'kish-aquarium',
    category: 'amenity',
    coordinates: [53.9440, 26.5700],
    name: { fa: 'آکواریوم کیش', en: 'Kish Aquarium' },
    address: {
      fa: 'جزیره کیش، شمال غرب جزیره، مجاور پارک ساحلی',
      en: 'Kish Island, Northwest shore, near Coastal Park',
    },
    description: {
      fa: 'آکواریوم کیش با بیش از ۱۰۰ گونه آبزی از خلیج فارس و اقیانوس هند، شامل کوسه‌های مرجانی، لاک‌پشت دریایی، اختاپوس‌های رنگارنگ و مرجان‌های زنده است. تونل شیشه‌ای ۲۰ متری حس غوطه‌ور شدن در دریا را به بازدیدکنندگان می‌دهد.',
      en: 'Kish Aquarium houses over 100 marine species from the Persian Gulf and Indian Ocean, including reef sharks, sea turtles, colorful octopuses, and living corals. A 20-meter glass tunnel gives visitors the feeling of walking under the sea.',
    },
    guide: {
      fa: 'ساعات کاری: ۹ صبح تا ۹ شب. بلیط خانوادگی موجود است. برنامه تغذیه کوسه: شنبه‌ها ساعت ۴ عصر.',
      en: 'Hours: 9 AM – 9 PM. Family tickets available. Shark feeding show: Saturdays at 4 PM.',
    },
    images: [
      { src: 'https://picsum.photos/seed/aquarium1/800/500', alt: 'Kish Aquarium' },
      { src: 'https://picsum.photos/seed/aquarium2/800/500', alt: 'Kish Aquarium tunnel' },
    ],
    ticketUrl: 'https://kishview.com',
  },

  // ──────────────────────────────────────────────────────────────
  // Iranian Bazaar (Bazaar-e-Irani)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'iranian-bazaar',
    category: 'shopping',
    coordinates: [53.9622, 26.5610],
    name: { fa: 'بازار ایرانیان', en: 'Iranian Bazaar' },
    address: {
      fa: 'جزیره کیش، مرکز شهر، خیابان ایران',
      en: 'Kish Island, City Centre, Iran Street',
    },
    description: {
      fa: 'بازار ایرانیان قدیمی‌ترین و اصیل‌ترین بازار جزیره کیش با معماری سنتی ایرانی است. صدها غرفه با صنایع دستی، فرش‌های دستباف، ادویه‌جات، جواهرات و محصولات معاف از گمرک کیش.',
      en: 'Iranian Bazaar is Kish\'s oldest and most authentic market with traditional Iranian architecture. Hundreds of stalls sell handicrafts, hand-woven carpets, spices, jewelry, and duty-free goods.',
    },
    guide: {
      fa: 'ساعات کاری: ۹ صبح تا ۱۲ شب. چانه‌زنی مرسوم است. تبادل ارز در داخل بازار موجود است.',
      en: 'Hours: 9 AM – midnight. Bargaining is customary. Currency exchange available inside the market.',
    },
    images: [
      { src: 'https://picsum.photos/seed/bazaar1/800/500', alt: 'Iranian Bazaar Kish' },
      { src: 'https://picsum.photos/seed/bazaar2/800/500', alt: 'Bazaar handicrafts' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // Coral Beach
  // ──────────────────────────────────────────────────────────────
  {
    id: 'coral-beach',
    category: 'water-sports',
    coordinates: [53.9580, 26.5455],
    name: { fa: 'ساحل مرجانی', en: 'Coral Beach' },
    address: {
      fa: 'جزیره کیش، جنوب جزیره، ساحل مرجانی',
      en: 'Kish Island, South Shore, Coral Beach',
    },
    description: {
      fa: 'ساحل مرجانی زیباترین ساحل جنوبی کیش با آب‌های فیروزه‌ای شفاف و مرجان‌های رنگارنگ در اعماق کم است. مناسب برای شنا، غواصی با اسنورکل و عکاسی زیرآب.',
      en: 'Coral Beach is Kish\'s most beautiful southern shore, with crystal-clear turquoise water and colorful coral reefs at shallow depths. Perfect for swimming, snorkeling, and underwater photography.',
    },
    guide: {
      fa: 'بهترین زمان: صبح زود (۶–۹) برای آب آرام. تجهیزات اسنورکل کرایه‌ای موجود. ورود با لباس شنا الزامی.',
      en: 'Best time: early morning (6–9 AM) for calm water. Snorkel gear rental on-site. Swimwear required.',
    },
    images: [
      { src: 'https://picsum.photos/seed/coralbeach1/800/500', alt: 'Coral Beach Kish' },
      { src: 'https://picsum.photos/seed/coralbeach2/800/500', alt: 'Coral Beach underwater' },
    ],
    ticketUrl: 'https://kishview.com',
  },

  // ──────────────────────────────────────────────────────────────
  // Greek Ship
  // ──────────────────────────────────────────────────────────────
  {
    id: 'greek-ship',
    category: 'amenity',
    coordinates: [53.9420, 26.5350],
    name: { fa: 'کشتی یونانی', en: 'Greek Ship' },
    address: {
      fa: 'جزیره کیش، جنوب غربی، ساحل صدف',
      en: 'Kish Island, Southwest, Sadaf Shore',
    },
    description: {
      fa: 'لنگرگاه تاریخی کشتی باری یونانی «کاپتان کوستاس» که از سال ۱۳۴۵ (۱۹۶۶ میلادی) در ساحل جنوب‌غربی کیش به گِل نشسته. این کشتی زنگ‌زده حالا یکی از محبوب‌ترین مکان‌های عکاسی کیش است، بویژه هنگام غروب آفتاب.',
      en: 'The historic grounding site of Greek cargo ship "Captain Kostas" since 1966, now stranded on Kish\'s southwest shore. This rusty wreck is one of Kish\'s most beloved photography spots, especially at sunset.',
    },
    guide: {
      fa: 'بازدید رایگان و آزاد. بهترین زمان: غروب آفتاب برای عکاسی (طلایی). مراقب امواج در مواقع طوفانی باشید.',
      en: 'Free and open access. Best time: sunset for golden-hour photography. Watch for waves during windy weather.',
    },
    images: [
      { src: 'https://picsum.photos/seed/greekship1/800/500', alt: 'Greek Ship Kish sunset' },
      { src: 'https://picsum.photos/seed/greekship2/800/500', alt: 'Greek Ship aerial' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // Harireh Ancient City
  // ──────────────────────────────────────────────────────────────
  {
    id: 'harireh-ancient',
    category: 'amenity',
    coordinates: [53.9350, 26.5620],
    name: { fa: 'شهر باستانی حریره', en: 'Harireh Ancient City' },
    address: {
      fa: 'جزیره کیش، شمال غرب، جاده حریره',
      en: 'Kish Island, Northwest, Harireh Road',
    },
    description: {
      fa: 'بقایای شهر باستانی حریره، پایتخت کیش در قرن دوم تا هفتم هجری. این شهر در اوج شکوفایی خود بیش از ۴۰٬۰۰۰ نفر جمعیت داشت و مرکز تجاری مهمی در خلیج فارس بود. حمام‌های تاریخی، مساجد و خانه‌های قدیمی هنوز قابل مشاهده است.',
      en: 'Ruins of Harireh, Kish\'s capital from the 2nd to 7th century AH. At its peak it was home to 40,000 people and a major Persian Gulf trade hub. Historic bathhouses, mosques, and old homes are still visible.',
    },
    guide: {
      fa: 'بازدید رایگان. بهترین زمان: اوایل صبح یا ساعت طلایی غروب. راهنمای تور محلی از مرکز گردشگری کیش قابل رزرو.',
      en: 'Free entry. Best time: early morning or golden hour. Local tour guides bookable from Kish Tourism Centre.',
    },
    images: [
      { src: 'https://picsum.photos/seed/harireh1/800/500', alt: 'Harireh Ancient City ruins' },
      { src: 'https://picsum.photos/seed/harireh2/800/500', alt: 'Harireh aerial view' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // Dolphin Park
  // ──────────────────────────────────────────────────────────────
  {
    id: 'dolphin-park',
    category: 'water-sports',
    coordinates: [53.9720, 26.5650],
    name: { fa: 'پارک دلفین‌ها', en: 'Dolphin Park' },
    address: {
      fa: 'جزیره کیش، شمال شرق، بلوار ساحلی',
      en: 'Kish Island, Northeast, Coastal Boulevard',
    },
    description: {
      fa: 'پارک آبی منحصربه‌فرد با نمایش دلفین‌های بطری‌نوک، شیرهای دریایی، اُرکاها و امکانات شنا در استخرهای بزرگ گرمایش‌دار.',
      en: 'Unique water park with bottlenose dolphin shows, sea lion performances, orca displays, and heated swimming pools for the whole family.',
    },
    guide: {
      fa: 'ساعات کاری: ۹ صبح تا ۱۰ شب. نمایش دلفین: ۱۱ صبح، ۳ عصر، ۷ شب. خرید بلیط آنلاین توصیه می‌شود.',
      en: 'Hours: 9 AM – 10 PM. Dolphin shows: 11 AM, 3 PM, 7 PM. Online ticket purchase recommended.',
    },
    images: [
      { src: 'https://picsum.photos/seed/dolphin1/800/500', alt: 'Dolphin Park Kish' },
      { src: 'https://picsum.photos/seed/dolphin2/800/500', alt: 'Dolphin show' },
    ],
    ticketUrl: 'https://kishview.com',
  },

  // ──────────────────────────────────────────────────────────────
  // Venus Mall
  // ──────────────────────────────────────────────────────────────
  {
    id: 'venus-mall',
    category: 'shopping',
    coordinates: [53.9630, 26.5580],
    name: { fa: 'مال ونوس', en: 'Venus Mall' },
    address: {
      fa: 'جزیره کیش، مرکز تجاری، خیابان معلم',
      en: 'Kish Island, Commercial Centre, Moallem Street',
    },
    description: {
      fa: 'مال ونوس یکی از قدیمی‌ترین مراکز خرید کیش با بیش از ۲۰۰ برند، رستوران‌های متنوع ایرانی و بین‌المللی، سینما و بازی‌های رایانه‌ای.',
      en: 'Venus Mall is one of Kish\'s oldest shopping centres, with 200+ brands, diverse Iranian and international restaurants, cinema, and video game arcades.',
    },
    guide: {
      fa: 'ساعات کاری: ۱۰ صبح تا ۱۲ شب. طبقه سوم: فودکورت. طبقه چهارم: سینما و تفریح.',
      en: 'Hours: 10 AM – midnight. 3rd floor: food court. 4th floor: cinema and entertainment.',
    },
    images: [
      { src: 'https://picsum.photos/seed/venus1/800/500', alt: 'Venus Mall Kish' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // Café Rose (beachfront café)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'kish-cafe-rose',
    category: 'cafe',
    coordinates: [53.9690, 26.5520],
    name: { fa: 'کافه رز', en: 'Café Rose' },
    address: {
      fa: 'جزیره کیش، ساحل شمالی، پروماند ساحلی',
      en: 'Kish Island, North Shore, Seafront Promenade',
    },
    description: {
      fa: 'کافه‌ای دنج با منظره مستقیم به دریا، سرو انواع قهوه تخصصی، دسرهای محلی کیشی و اتمسفر آرام‌بخش مناسب برای تماشای غروب.',
      en: 'Cozy beachfront café with direct sea views, specialty coffee, local Kish desserts, and a calming atmosphere perfect for watching the sunset.',
    },
    guide: {
      fa: 'ساعات کاری: ۷ صبح تا ۱۱ شب. رزرو میز برای ساعات غروب (۵ تا ۷) توصیه می‌شود.',
      en: 'Hours: 7 AM – 11 PM. Table reservation recommended for sunset hours (5–7 PM).',
    },
    images: [
      { src: 'https://picsum.photos/seed/caferose1/800/500', alt: 'Café Rose Kish' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // Kish Bowling Center
  // ──────────────────────────────────────────────────────────────
  {
    id: 'kish-bowling',
    category: 'land-sports',
    coordinates: [53.9750, 26.5700],
    name: { fa: 'بولینگ کیش', en: 'Kish Bowling Center' },
    address: {
      fa: 'جزیره کیش، شمال شرق، مجموعه تفریحی کیش',
      en: 'Kish Island, Northeast, Kish Entertainment Complex',
    },
    description: {
      fa: 'مدرن‌ترین مرکز بولینگ جنوب ایران با ۲۴ لاین حرفه‌ای استاندارد، بیلیارد، پینگ‌پنگ، بازی‌های ویدیویی و فودکورت داخلی.',
      en: 'The most modern bowling center in southern Iran, with 24 professional lanes, billiards, table tennis, video games, and an indoor food court.',
    },
    guide: {
      fa: 'ساعات کاری: ۱۰ صبح تا ۲ بامداد. رزرو آنلاین در ایام پرترافیک توصیه می‌شود. کفش بولینگ کرایه‌ای موجود.',
      en: 'Hours: 10 AM – 2 AM. Online reservation recommended on busy days. Bowling shoes available for rent.',
    },
    images: [
      { src: 'https://picsum.photos/seed/bowling1/800/500', alt: 'Kish Bowling Center' },
    ],
    ticketUrl: 'https://kishview.com',
  },
];
