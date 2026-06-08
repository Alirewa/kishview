import type { Place } from '@/types';

/**
 * Kish Island approximate bounds:
 *   West  53.890 | East  54.020
 *   South 26.524 | North 26.584  (north coast rises toward east)
 */
export const places: Place[] = [

  // ════════ SHOPPING ════════════════════════════════════════

  {
    id: 'mikamall',
    category: 'shopping',
    coordinates: [53.9694, 26.554],
    name: { fa: 'میکامال', en: 'Mikamall' },
    address: { fa: 'بلوار ساحلی شهید چمران، کیش', en: 'Shahid Chamran Coastal Blvd, Kish' },
    description: {
      fa: 'بزرگ‌ترین و مدرن‌ترین مرکز خرید کیش با زیربنای ۱۲۰٬۰۰۰ متر مربع، بیش از ۲۵۰ برند، پارک آبی سرپوشیده، سینما، فودکورت چندطبقه و بزرگ‌ترین اسکیت‌پارک سرپوشیده ایران.',
      en: 'Kish\'s largest mall — 120,000 m², 250+ brands, indoor water park, cinema, multi-level food court, and Iran\'s largest indoor skate park.',
    },
    guide: {
      fa: 'ساعات کاری: ۱۰ صبح تا ۱ بامداد. پارکینگ رایگان ۳٬۰۰۰ خودرو.',
      en: 'Hours: 10 AM – 1 AM. Free parking for 3,000 vehicles.',
    },
    images: [{ src: 'https://picsum.photos/seed/mikamall/800/500', alt: 'Mikamall Kish' }],
  },

  {
    id: 'venus-mall',
    category: 'shopping',
    coordinates: [53.9632, 26.558],
    name: { fa: 'مال ونوس', en: 'Venus Mall' },
    address: { fa: 'خیابان معلم، مرکز شهر کیش', en: 'Moallem St, Kish City Centre' },
    description: {
      fa: 'یکی از قدیمی‌ترین و پرتردد‌ترین مراکز خرید کیش با بیش از ۲۰۰ برند، رستوران‌های متنوع، سینما و فضای تفریحی.',
      en: 'One of Kish\'s oldest and busiest malls — 200+ brands, diverse dining, cinema, and entertainment.',
    },
    guide: {
      fa: 'ساعات کاری: ۱۰ صبح تا ۱۲ شب. فودکورت در طبقه سوم.',
      en: 'Hours: 10 AM – midnight. Food court on the 3rd floor.',
    },
    images: [{ src: 'https://picsum.photos/seed/venusmall/800/500', alt: 'Venus Mall Kish' }],
  },

  {
    id: 'iranian-bazaar',
    category: 'shopping',
    coordinates: [53.9575, 26.560],
    name: { fa: 'بازار ایرانیان', en: 'Iranian Bazaar' },
    address: { fa: 'خیابان ایران، مرکز کیش', en: 'Iran St, Kish Centre' },
    description: {
      fa: 'قدیمی‌ترین بازار کیش با معماری سنتی ایرانی؛ صدها غرفه صنایع دستی، فرش دستباف، ادویه، جواهرات و کالای معاف از گمرک.',
      en: 'Kish\'s oldest market with traditional Persian architecture — handcrafts, carpets, spices, jewellery, and duty-free goods.',
    },
    guide: {
      fa: 'ساعات کاری: ۹ صبح تا ۱۲ شب. چانه‌زنی مرسوم است.',
      en: 'Hours: 9 AM – midnight. Bargaining is customary.',
    },
    images: [{ src: 'https://picsum.photos/seed/iranianbazaar/800/500', alt: 'Iranian Bazaar Kish' }],
  },

  {
    id: 'leather-bazaar',
    category: 'shopping',
    coordinates: [53.9648, 26.552],
    name: { fa: 'بازار چرم کیش', en: 'Kish Leather Bazaar' },
    address: { fa: 'خیابان صادقی، کیش', en: 'Sadeqi St, Kish' },
    description: {
      fa: 'بزرگ‌ترین مجموعه فروشگاه‌های چرم طبیعی در جزیره کیش. کیف، کفش، کمربند و پوشاک چرمی با قیمت معاف از گمرک.',
      en: 'Kish\'s largest genuine leather market — bags, shoes, belts, and apparel at duty-free prices.',
    },
    guide: {
      fa: 'قیمت‌ها معاف از گمرک. پذیرش ارز خارجی.',
      en: 'Duty-free prices. Foreign currency accepted.',
    },
    images: [{ src: 'https://picsum.photos/seed/leatherbazaar/800/500', alt: 'Kish Leather Bazaar' }],
  },

  {
    id: 'panorama-mall',
    category: 'shopping',
    coordinates: [53.9710, 26.557],
    name: { fa: 'مرکز خرید پانوراما', en: 'Panorama Shopping Centre' },
    address: { fa: 'بلوار پانوراما، کیش', en: 'Panorama Blvd, Kish' },
    description: {
      fa: 'مجتمع تجاری مدرن با برندهای بین‌المللی، رستوران‌های زنجیره‌ای و تراس روف‌تاپ با منظره دریا.',
      en: 'Modern commercial complex with international brands, chain restaurants, and a rooftop terrace with sea views.',
    },
    guide: {
      fa: 'ساعات کاری: ۱۰ صبح تا ۱۲ شب.',
      en: 'Hours: 10 AM – midnight.',
    },
    images: [{ src: 'https://picsum.photos/seed/panoramamall/800/500', alt: 'Panorama Mall Kish' }],
  },

  // ════════ HOTELS ══════════════════════════════════════════

  {
    id: 'dariush-hotel',
    category: 'hotel',
    coordinates: [53.9352, 26.572],   // north-west coast, pulled back from shore
    name: { fa: 'هتل بزرگ داریوش', en: 'Dariush Grand Hotel' },
    address: { fa: 'بلوار داریوش، شمال کیش', en: 'Dariush Blvd, North Kish' },
    description: {
      fa: 'نمادین‌ترین هتل کیش با الهام از معماری تخت‌جمشید. ستون‌های هخامنشی و طلاکاری‌های باشکوه آن را به یکی از شناخته‌شده‌ترین هتل‌های ایران تبدیل کرده.',
      en: 'Kish\'s most iconic hotel — inspired by Persepolis with Achaemenid columns, golden reliefs, and world-class service.',
    },
    guide: {
      fa: 'رستوران‌ها برای غیرمهمانان هم باز است. تور معماری روزانه ساعت ۱۰ صبح.',
      en: 'Restaurants open to non-guests. Architecture tours daily at 10 AM.',
    },
    images: [{ src: 'https://picsum.photos/seed/dariushhotel/800/500', alt: 'Dariush Grand Hotel Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'flamingo-hotel',
    category: 'hotel',
    coordinates: [53.9820, 26.578],   // north-east coast, ~300 m from shore
    name: { fa: 'هتل فلامینگو', en: 'Flamingo Hotel' },
    address: { fa: 'ساحل شمال شرقی، کیش', en: 'Northeast Shore, Kish' },
    description: {
      fa: 'یکی از قدیمی‌ترین و محبوب‌ترین هتل‌های کیش با موقعیت ساحلی عالی. استخر، رستوران دریایی و دسترسی مستقیم به ساحل اختصاصی.',
      en: 'One of Kish\'s oldest hotels — prime beachfront location, pool, seafood restaurant, and private beach access.',
    },
    guide: {
      fa: 'ساحل اختصاصی برای مهمانان. رزرو مستقیم توصیه می‌شود.',
      en: 'Private beach for guests. Direct booking recommended.',
    },
    images: [{ src: 'https://picsum.photos/seed/flamingokish/800/500', alt: 'Flamingo Hotel Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'parmis-hotel',
    category: 'hotel',
    coordinates: [53.9578, 26.570],   // north-central, safely on land
    name: { fa: 'هتل پارمیس', en: 'Parmis Hotel' },
    address: { fa: 'ساحل شمالی، کیش', en: 'North Shore, Kish' },
    description: {
      fa: 'هتل ساحلی چهارستاره با منظره مستقیم به خلیج فارس، استخر، سالن ورزشی، رستوران و اتاق‌های مدرن.',
      en: 'Four-star beachfront hotel with Persian Gulf views, pool, gym, restaurant, and modern rooms.',
    },
    guide: {
      fa: 'موقعیت مرکزی با دسترسی آسان به مراکز خرید و جاذبه‌ها.',
      en: 'Central location with easy access to shopping and attractions.',
    },
    images: [{ src: 'https://picsum.photos/seed/parmishotel/800/500', alt: 'Parmis Hotel Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  // ════════ BEACHES & WATER ════════════════════════════════

  {
    id: 'coral-beach',
    category: 'water-sports',
    coordinates: [53.9585, 26.529],   // south shore — on land, not in water
    name: { fa: 'ساحل مرجانی', en: 'Coral Beach' },
    address: { fa: 'ساحل جنوبی کیش', en: 'South Shore, Kish' },
    description: {
      fa: 'زیباترین ساحل جنوبی کیش با آب فیروزه‌ای شفاف و مرجان‌های رنگارنگ در اعماق کم. ایده‌آل برای شنا، اسنورکل و غواصی.',
      en: 'Kish\'s most beautiful southern beach — crystal-clear turquoise water, shallow colorful corals, perfect for swimming, snorkeling, and diving.',
    },
    guide: {
      fa: 'بهترین زمان: صبح زود ۶–۹. تجهیزات اسنورکل کرایه‌ای در ساحل.',
      en: 'Best time: early morning 6–9 AM. Snorkel gear rental on-site.',
    },
    images: [{ src: 'https://picsum.photos/seed/coralbeach/800/500', alt: 'Coral Beach Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'sadaf-beach',
    category: 'water-sports',
    coordinates: [53.9900, 26.528],   // south-east shore — on land
    name: { fa: 'ساحل صدف', en: 'Sadaf Beach' },
    address: { fa: 'ساحل جنوب شرقی کیش', en: 'Southeast Shore, Kish' },
    description: {
      fa: 'یکی از محبوب‌ترین سواحل عمومی کیش با آب گرم و آرام، مناسب خانواده. امکانات ورزش‌های آبی، نجات غریق و کافه‌های ساحلی.',
      en: 'One of Kish\'s most popular public beaches — warm, calm water ideal for families, water sports, lifeguards, and beachside cafés.',
    },
    guide: {
      fa: 'ساعات: ۶ صبح تا ۱۰ شب. بخش جداگانه خانم‌ها و آقایان.',
      en: 'Hours: 6 AM – 10 PM. Separate sections for men and women.',
    },
    images: [{ src: 'https://picsum.photos/seed/sadafbeach/800/500', alt: 'Sadaf Beach Kish' }],
  },

  {
    id: 'dolphin-park',
    category: 'water-sports',
    coordinates: [53.9718, 26.563],
    name: { fa: 'پارک دلفین‌ها', en: 'Dolphin Park' },
    address: { fa: 'بلوار ساحلی شمالی، کیش', en: 'North Coastal Blvd, Kish' },
    description: {
      fa: 'پارک آبی با نمایش دلفین‌های بطری‌نوک، شیرهای دریایی و استخرهای گرمایش‌دار.',
      en: 'Water park featuring bottlenose dolphin shows, sea lion performances, and heated pools.',
    },
    guide: {
      fa: 'نمایش دلفین: ۱۱ صبح، ۳ و ۷ عصر. خرید آنلاین توصیه می‌شود.',
      en: 'Dolphin shows: 11 AM, 3 PM, 7 PM. Online booking recommended.',
    },
    images: [{ src: 'https://picsum.photos/seed/dolphinkish/800/500', alt: 'Dolphin Park Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'diving-pier',
    category: 'water-sports',
    coordinates: [53.9502, 26.569],   // north shore area
    name: { fa: 'اسکله غواصی', en: 'Diving Pier' },
    address: { fa: 'ساحل شمال غربی، کیش', en: 'Northwest Shore, Kish' },
    description: {
      fa: 'مرکز غواصی حرفه‌ای کیش با کلاس‌های PADI، تجهیزات اجاره‌ای و تور مرجان‌های خلیج فارس.',
      en: 'Professional diving centre — PADI courses, full equipment rental, guided coral tours in the Persian Gulf.',
    },
    guide: {
      fa: 'تور روزانه ۸ صبح و ۳ عصر. گواهینامه بین‌المللی صادر می‌شود.',
      en: 'Daily tours at 8 AM & 3 PM. International certification issued.',
    },
    images: [{ src: 'https://picsum.photos/seed/divingkish/800/500', alt: 'Kish Diving Pier' }],
    ticketUrl: 'https://kishview.com',
  },

  // ════════ HISTORICAL & CULTURAL ═══════════════════════════

  {
    id: 'greek-ship',
    category: 'amenity',
    coordinates: [53.9325, 26.531],   // south-west shore — actual wreck location
    name: { fa: 'کشتی یونانی', en: 'Greek Ship' },
    address: { fa: 'ساحل جنوب غربی کیش', en: 'Southwest Shore, Kish' },
    description: {
      fa: 'لنگرگاه تاریخی کشتی یونانی «کاپتان کوستاس» از سال ۱۳۴۵. این کشتی زنگ‌زده محبوب‌ترین نقطه عکاسی کیش است — بویژه هنگام غروب.',
      en: 'Grounding site of Greek cargo ship "Captain Kostas" since 1966 — Kish\'s most photographed landmark, especially at sunset.',
    },
    guide: {
      fa: 'بازدید رایگان. بهترین زمان: غروب آفتاب.',
      en: 'Free entry. Best time: sunset.',
    },
    images: [{ src: 'https://picsum.photos/seed/greekship/800/500', alt: 'Greek Ship Kish' }],
  },

  {
    id: 'harireh-ancient',
    category: 'amenity',
    coordinates: [53.9105, 26.572],   // actual north-west ruins location
    name: { fa: 'شهر باستانی حریره', en: 'Harireh Ancient City' },
    address: { fa: 'شمال غرب کیش، جاده حریره', en: 'NW Kish, Harireh Rd' },
    description: {
      fa: 'بقایای پایتخت قرن دوم تا هفتم هجری کیش با جمعیت ۴۰٬۰۰۰ نفری. حمام‌ها، مساجد و خانه‌های تاریخی هنوز قابل مشاهده‌اند.',
      en: 'Ruins of Kish\'s medieval capital, once home to 40,000 people — historic baths, mosques, and homes still visible.',
    },
    guide: {
      fa: 'بازدید رایگان. بهترین زمان: ساعت طلایی غروب.',
      en: 'Free entry. Best time: golden hour at sunset.',
    },
    images: [{ src: 'https://picsum.photos/seed/harireh/800/500', alt: 'Harireh Ancient City' }],
  },

  {
    id: 'anthropology-museum',
    category: 'amenity',
    coordinates: [53.9538, 26.566],
    name: { fa: 'موزه مردم‌شناسی کیش', en: 'Kish Anthropology Museum' },
    address: { fa: 'خیابان فرهنگ، کیش', en: 'Farhang St, Kish' },
    description: {
      fa: 'موزه‌ای با آثار و اشیاء تاریخی مردم بومی کیش، نمایش شیوه زندگی سنتی ماهیگیران، صنایع دستی دریایی و تاریخ تجاری خلیج فارس.',
      en: 'Museum displaying artefacts of Kish\'s indigenous people, traditional fishermen\'s lifestyles, maritime crafts, and Persian Gulf trade history.',
    },
    guide: {
      fa: 'ساعات کاری: ۹ صبح تا ۵ عصر. ورودیه اندک.',
      en: 'Hours: 9 AM – 5 PM. Small entry fee.',
    },
    images: [{ src: 'https://picsum.photos/seed/kishmuseum/800/500', alt: 'Kish Anthropology Museum' }],
  },

  {
    id: 'safa-house',
    category: 'amenity',
    coordinates: [53.9062, 26.563],   // old Safa village, north-west
    name: { fa: 'خانه تاریخی صفا', en: 'Safa Historical House' },
    address: { fa: 'روستای قدیمی صفا، کیش', en: 'Old Safa Village, Kish' },
    description: {
      fa: 'خانه اصیل بومی کیش متعلق به دوران قاجار با معماری بادگیر، دیوارهای آهک‌پوش و حیاط مرکزی.',
      en: 'Authentic Qajar-era home with traditional wind-tower architecture, lime-plastered walls, and a central courtyard.',
    },
    guide: {
      fa: 'بازدید رایگان. راهنمای محلی موجود است.',
      en: 'Free entry. Local guides available.',
    },
    images: [{ src: 'https://picsum.photos/seed/safahouse/800/500', alt: 'Safa Historical House Kish' }],
  },

  // ════════ AQUARIUM & NATURE ═══════════════════════════════

  {
    id: 'kish-aquarium',
    category: 'amenity',
    coordinates: [53.9440, 26.568],   // north-west, pulled back from coast
    name: { fa: 'آکواریوم کیش', en: 'Kish Aquarium' },
    address: { fa: 'شمال غرب کیش، مجاور پارک ساحلی', en: 'NW Kish, near Coastal Park' },
    description: {
      fa: 'بیش از ۱۰۰ گونه آبزی خلیج فارس: کوسه، لاک‌پشت دریایی، اختاپوس و مرجان زنده. تونل شیشه‌ای ۲۰ متری.',
      en: '100+ Persian Gulf species — reef sharks, sea turtles, octopus, live coral. 20-metre glass walk-through tunnel.',
    },
    guide: {
      fa: 'ساعات: ۹ صبح تا ۹ شب. تغذیه کوسه شنبه‌ها ۴ عصر.',
      en: 'Hours: 9 AM – 9 PM. Shark feeding: Saturdays at 4 PM.',
    },
    images: [{ src: 'https://picsum.photos/seed/kishaquarium/800/500', alt: 'Kish Aquarium' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'bird-garden',
    category: 'amenity',
    coordinates: [53.9521, 26.570],   // north area, safe from coast
    name: { fa: 'باغ پرندگان کیش', en: 'Kish Bird Garden' },
    address: { fa: 'بلوار میرزاکوچک‌خان، کیش', en: 'Mirzakuchekhan Blvd, Kish' },
    description: {
      fa: 'باغ پرندگان گرمسیری با بیش از ۳۰۰ گونه از سراسر جهان در محیط‌های طبیعی سرسبز.',
      en: '300+ tropical bird species from around the world in lush naturalistic enclosures.',
    },
    guide: {
      fa: 'ساعات: ۸ صبح تا ۸ شب. ورودیه خانوادگی موجود است.',
      en: 'Hours: 8 AM – 8 PM. Family tickets available.',
    },
    images: [{ src: 'https://picsum.photos/seed/kishbirds/800/500', alt: 'Kish Bird Garden' }],
    ticketUrl: 'https://kishview.com',
  },

  // ════════ ENTERTAINMENT & SPORTS ═════════════════════════

  {
    id: 'kish-bowling',
    category: 'land-sports',
    coordinates: [53.9748, 26.566],
    name: { fa: 'بولینگ کیش', en: 'Kish Bowling Center' },
    address: { fa: 'مجموعه تفریحی شمال شرق، کیش', en: 'NE Entertainment Complex, Kish' },
    description: {
      fa: 'مدرن‌ترین مرکز بولینگ جنوب ایران با ۲۴ لاین حرفه‌ای، بیلیارد، پینگ‌پنگ و فودکورت داخلی.',
      en: 'South Iran\'s most modern bowling centre — 24 pro lanes, billiards, table tennis, indoor food court.',
    },
    guide: {
      fa: 'ساعات: ۱۰ صبح تا ۲ بامداد. کفش کرایه‌ای موجود.',
      en: 'Hours: 10 AM – 2 AM. Shoe rental available.',
    },
    images: [{ src: 'https://picsum.photos/seed/kishbowling/800/500', alt: 'Kish Bowling Center' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'luna-park',
    category: 'land-sports',
    coordinates: [53.9714, 26.556],
    name: { fa: 'لوناپارک کیش', en: 'Kish Luna Park' },
    address: { fa: 'بلوار تفریحی، مرکز کیش', en: 'Entertainment Blvd, Central Kish' },
    description: {
      fa: 'پارک شهربازی با چرخ‌وفلک، هواپیما، ماشین برقی، ترامپولین و بازی‌های کودکانه.',
      en: 'Amusement park with Ferris wheel, spinning planes, bumper cars, trampolines, and children\'s rides.',
    },
    guide: {
      fa: 'ساعات: ۵ عصر تا ۱۲ شب. بلیط جداگانه برای هر وسیله.',
      en: 'Hours: 5 PM – midnight. Separate ticket per ride.',
    },
    images: [{ src: 'https://picsum.photos/seed/kishluna/800/500', alt: 'Kish Luna Park' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'parvaz-park',
    category: 'amenity',
    coordinates: [53.9648, 26.560],
    name: { fa: 'پارک پرواز', en: 'Parvaz Park' },
    address: { fa: 'بلوار پرواز، مرکز کیش', en: 'Parvaz Blvd, Central Kish' },
    description: {
      fa: 'قلب سبز کیش با مسیرهای دوچرخه‌سواری، نصب‌های هنری، فضای پیاده‌روی و دریاچه مصنوعی.',
      en: 'Kish\'s central green lung — cycling paths, art installations, walking trails, and an artificial lake.',
    },
    guide: {
      fa: 'ورودی رایگان. آرامش‌بخش در صبح و غروب.',
      en: 'Free entry. Most peaceful early morning and at sunset.',
    },
    images: [{ src: 'https://picsum.photos/seed/parvazpark/800/500', alt: 'Parvaz Park Kish' }],
  },

  // ════════ CAFÉS & RESTAURANTS ═════════════════════════════

  {
    id: 'kish-cafe-rose',
    category: 'cafe',
    coordinates: [53.9690, 26.548],
    name: { fa: 'کافه رز', en: 'Café Rose' },
    address: { fa: 'پروماند ساحلی شمالی، کیش', en: 'North Seafront Promenade, Kish' },
    description: {
      fa: 'کافه‌ای دنج با منظره مستقیم دریا، قهوه تخصصی، دسرهای محلی و اتمسفر آرامش‌بخش — بهترین مکان تماشای غروب.',
      en: 'Cosy beachfront café with direct sea views, specialty coffee, local Kish desserts — the best sunset spot.',
    },
    guide: {
      fa: 'ساعات: ۷ صبح تا ۱۱ شب. رزرو میز برای غروب توصیه می‌شود.',
      en: 'Hours: 7 AM – 11 PM. Table reservation recommended for sunset.',
    },
    images: [{ src: 'https://picsum.photos/seed/caferose/800/500', alt: 'Café Rose Kish' }],
  },

  {
    id: 'zeiytoon-restaurant',
    category: 'restaurant',
    coordinates: [53.9602, 26.553],
    name: { fa: 'رستوران زیتون', en: 'Zeiytoon Restaurant' },
    address: { fa: 'خیابان زیتون، مرکز کیش', en: 'Zeiytoon St, Central Kish' },
    description: {
      fa: 'رستوران معروف کیش با تخصص در غذاهای دریایی تازه: میگو، هامور، خرچنگ و پیش‌غذاهای بومی جنوبی.',
      en: 'Kish\'s renowned seafood restaurant — fresh shrimp, grouper, crab, and Southern Iranian appetisers.',
    },
    guide: {
      fa: 'رزرو سفره ضروری در ایام تعطیل. ساعات: ۱۲ تا ۱۱ شب.',
      en: 'Reservation essential on holidays. Hours: noon – 11 PM.',
    },
    images: [{ src: 'https://picsum.photos/seed/zeiytoon/800/500', alt: 'Zeiytoon Restaurant Kish' }],
  },

  {
    id: 'darya-cafe',
    category: 'cafe',
    coordinates: [53.9558, 26.572],   // north shore — 26.572 safely on land
    name: { fa: 'کافه دریا', en: 'Darya Café' },
    address: { fa: 'ساحل شمالی، کیش', en: 'North Shore, Kish' },
    description: {
      fa: 'کافه مدرن با پنجره‌های پانوراما رو به خلیج فارس، صبحانه انگلیسی، موکتیل و کیک‌های خانگی.',
      en: 'Modern café with panoramic Persian Gulf windows, full English breakfast, mocktails, and home-baked cakes.',
    },
    guide: {
      fa: 'ساعات: ۷ صبح تا ۱۲ شب. صبحانه تا ساعت ۱۱.',
      en: 'Hours: 7 AM – midnight. Breakfast until 11 AM.',
    },
    images: [{ src: 'https://picsum.photos/seed/daryacafe/800/500', alt: 'Darya Café Kish' }],
  },
];
