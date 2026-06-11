// Developed by @Alirewa — github.com/Alirewa
import type { Place } from '@/types';

export const places: Place[] = [

  // ════ SHOPPING ════════════════════════════════════════════

  {
    id: 'mikamall',
    category: 'shopping',
    coordinates: [53.9618, 26.5547],
    name: { fa: 'میکامال', en: 'Mikamall' },
    address: { fa: 'بلوار ساحلی شهید چمران، کیش', en: 'Shahid Chamran Coastal Blvd, Kish' },
    description: {
      fa: 'بزرگ‌ترین و مدرن‌ترین مرکز خرید کیش با زیربنای ۱۲۰٬۰۰۰ متر مربع، بیش از ۲۵۰ برند، پارک آبی سرپوشیده، سینما، فودکورت چندطبقه و بزرگ‌ترین اسکیت‌پارک سرپوشیده ایران.',
      en: 'Kish\'s largest mall — 120,000 m², 250+ brands, indoor water park, cinema, multi-level food court, and Iran\'s largest indoor skate park.',
    },
    guide: { fa: 'پارکینگ رایگان ۳٬۰۰۰ خودرو. دسترسی آسان از همه نقاط جزیره.', en: 'Free parking for 3,000 vehicles. Easy access from all parts of the island.' },
    contact: {
      phone: '076-44441200',
      website: 'mikamall.com',
      hours: { fa: 'هر روز ۱۰ صبح تا ۱ بامداد', en: 'Daily 10 AM – 1 AM' },
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
    guide: { fa: 'فودکورت در طبقه سوم. دسترسی با تاکسی ساده است.', en: 'Food court on the 3rd floor. Easily accessible by taxi.' },
    contact: {
      phone: '076-44430000',
      hours: { fa: 'هر روز ۱۰ صبح تا ۱۲ شب', en: 'Daily 10 AM – midnight' },
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
    guide: { fa: 'چانه‌زنی مرسوم است. بهترین زمان خرید: عصر و شب.', en: 'Bargaining is customary. Best shopping time: afternoon and evening.' },
    contact: {
      phone: '076-44420100',
      hours: { fa: 'هر روز ۹ صبح تا ۱۲ شب', en: 'Daily 9 AM – midnight' },
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
    guide: { fa: 'قیمت‌ها معاف از گمرک. پذیرش ارز خارجی.', en: 'Duty-free prices. Foreign currency accepted.' },
    contact: {
      phone: '076-44421000',
      hours: { fa: 'هر روز ۱۰ صبح تا ۱۱ شب', en: 'Daily 10 AM – 11 PM' },
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
    guide: { fa: 'تراس روف‌تاپ برای غروب فوق‌العاده است.', en: 'Rooftop terrace is exceptional for sunset views.' },
    contact: {
      phone: '076-44428000',
      hours: { fa: 'هر روز ۱۰ صبح تا ۱۲ شب', en: 'Daily 10 AM – midnight' },
    },
    images: [{ src: 'https://picsum.photos/seed/panoramamall/800/500', alt: 'Panorama Mall Kish' }],
  },

  // ════ HOTELS ══════════════════════════════════════════════

  {
    id: 'dariush-hotel',
    category: 'hotel',
    coordinates: [53.9416, 26.5746],
    name: { fa: 'هتل بزرگ داریوش', en: 'Dariush Grand Hotel' },
    address: { fa: 'بلوار داریوش، شمال کیش', en: 'Dariush Blvd, North Kish' },
    description: {
      fa: 'نمادین‌ترین هتل کیش با الهام از معماری تخت‌جمشید. ستون‌های هخامنشی و طلاکاری‌های باشکوه آن را به یکی از شناخته‌شده‌ترین هتل‌های ایران تبدیل کرده.',
      en: 'Kish\'s most iconic hotel — inspired by Persepolis with Achaemenid columns, golden reliefs, and world-class service.',
    },
    guide: { fa: 'رستوران‌ها برای غیرمهمانان هم باز است. تور معماری روزانه ساعت ۱۰ صبح.', en: 'Restaurants open to non-guests. Architecture tours daily at 10 AM.' },
    contact: {
      phone: '076-44432000',
      website: 'dariushhotel.com',
      hours: { fa: 'پذیرش ۲۴ ساعته', en: '24-hour reception' },
    },
    images: [{ src: 'https://picsum.photos/seed/dariushhotel/800/500', alt: 'Dariush Grand Hotel Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'flamingo-hotel',
    category: 'hotel',
    coordinates: [53.9820, 26.578],
    name: { fa: 'هتل فلامینگو', en: 'Flamingo Hotel' },
    address: { fa: 'ساحل شمال شرقی، کیش', en: 'Northeast Shore, Kish' },
    description: {
      fa: 'یکی از قدیمی‌ترین و محبوب‌ترین هتل‌های کیش با موقعیت ساحلی عالی. استخر، رستوران دریایی و دسترسی مستقیم به ساحل اختصاصی.',
      en: 'One of Kish\'s oldest hotels — prime beachfront location, pool, seafood restaurant, and private beach access.',
    },
    guide: { fa: 'ساحل اختصاصی برای مهمانان. رزرو مستقیم توصیه می‌شود.', en: 'Private beach for guests. Direct booking recommended.' },
    contact: {
      phone: '076-44433000',
      website: 'flamingokish.com',
      hours: { fa: 'پذیرش ۲۴ ساعته', en: '24-hour reception' },
    },
    images: [{ src: 'https://picsum.photos/seed/flamingokish/800/500', alt: 'Flamingo Hotel Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'parmis-hotel',
    category: 'hotel',
    coordinates: [53.9578, 26.570],
    name: { fa: 'هتل پارمیس', en: 'Parmis Hotel' },
    address: { fa: 'ساحل شمالی، کیش', en: 'North Shore, Kish' },
    description: {
      fa: 'هتل ساحلی چهارستاره با منظره مستقیم به خلیج فارس، استخر، سالن ورزشی، رستوران و اتاق‌های مدرن.',
      en: 'Four-star beachfront hotel with Persian Gulf views, pool, gym, restaurant, and modern rooms.',
    },
    guide: { fa: 'موقعیت مرکزی با دسترسی آسان به مراکز خرید و جاذبه‌ها.', en: 'Central location with easy access to shopping and attractions.' },
    contact: {
      phone: '076-44434000',
      website: 'parmishotel.com',
      hours: { fa: 'پذیرش ۲۴ ساعته', en: '24-hour reception' },
    },
    images: [{ src: 'https://picsum.photos/seed/parmishotel/800/500', alt: 'Parmis Hotel Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  // ════ BEACHES & WATER ═════════════════════════════════════

  {
    id: 'coral-beach',
    category: 'water-sports',
    coordinates: [53.9585, 26.529],
    name: { fa: 'ساحل مرجانی', en: 'Coral Beach' },
    address: { fa: 'ساحل جنوبی کیش', en: 'South Shore, Kish' },
    description: {
      fa: 'زیباترین ساحل جنوبی کیش با آب فیروزه‌ای شفاف و مرجان‌های رنگارنگ در اعماق کم. ایده‌آل برای شنا، اسنورکل و غواصی.',
      en: 'Kish\'s most beautiful southern beach — crystal-clear turquoise water, shallow colorful corals, perfect for swimming, snorkeling, and diving.',
    },
    guide: { fa: 'بهترین زمان: صبح زود ۶–۹. تجهیزات اسنورکل کرایه‌ای در ساحل.', en: 'Best time: early morning 6–9 AM. Snorkel gear rental on-site.' },
    contact: {
      hours: { fa: 'هر روز ۶ صبح تا ۱۰ شب', en: 'Daily 6 AM – 10 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/coralbeach/800/500', alt: 'Coral Beach Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'sadaf-beach',
    category: 'water-sports',
    coordinates: [53.9900, 26.528],
    name: { fa: 'ساحل صدف', en: 'Sadaf Beach' },
    address: { fa: 'ساحل جنوب شرقی کیش', en: 'Southeast Shore, Kish' },
    description: {
      fa: 'یکی از محبوب‌ترین سواحل عمومی کیش با آب گرم و آرام، مناسب خانواده. امکانات ورزش‌های آبی، نجات غریق و کافه‌های ساحلی.',
      en: 'One of Kish\'s most popular public beaches — warm, calm water ideal for families, water sports, lifeguards, and beachside cafés.',
    },
    guide: { fa: 'بخش جداگانه خانم‌ها و آقایان. نجات‌غریق حاضر است.', en: 'Separate sections for men and women. Lifeguards on duty.' },
    contact: {
      hours: { fa: 'هر روز ۶ صبح تا ۱۰ شب', en: 'Daily 6 AM – 10 PM' },
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
    guide: { fa: 'نمایش دلفین: ۱۱ صبح، ۳ و ۷ عصر. خرید آنلاین توصیه می‌شود.', en: 'Dolphin shows: 11 AM, 3 PM, 7 PM. Online booking recommended.' },
    contact: {
      phone: '076-44440000',
      hours: { fa: 'هر روز ۹ صبح تا ۹ شب', en: 'Daily 9 AM – 9 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/dolphinkish/800/500', alt: 'Dolphin Park Kish' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'diving-pier',
    category: 'water-sports',
    coordinates: [53.9502, 26.569],
    name: { fa: 'اسکله غواصی', en: 'Diving Pier' },
    address: { fa: 'ساحل شمال غربی، کیش', en: 'Northwest Shore, Kish' },
    description: {
      fa: 'مرکز غواصی حرفه‌ای کیش با کلاس‌های PADI، تجهیزات اجاره‌ای و تور مرجان‌های خلیج فارس.',
      en: 'Professional diving centre — PADI courses, full equipment rental, guided coral tours in the Persian Gulf.',
    },
    guide: { fa: 'تور روزانه ۸ صبح و ۳ عصر. گواهینامه بین‌المللی صادر می‌شود.', en: 'Daily tours at 8 AM & 3 PM. International certification issued.' },
    contact: {
      phone: '076-44439000',
      hours: { fa: 'هر روز ۷ صبح تا ۶ عصر', en: 'Daily 7 AM – 6 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/divingkish/800/500', alt: 'Kish Diving Pier' }],
    ticketUrl: 'https://kishview.com',
  },

  // ════ HISTORICAL & CULTURAL ════════════════════════════════

  {
    id: 'greek-ship',
    category: 'amenity',
    coordinates: [53.8968, 26.5342],
    name: { fa: 'کشتی یونانی', en: 'Greek Ship' },
    address: { fa: 'ساحل جنوب غربی کیش', en: 'Southwest Shore, Kish' },
    description: {
      fa: 'لنگرگاه تاریخی کشتی یونانی «کاپتان کوستاس» از سال ۱۳۴۵. این کشتی زنگ‌زده محبوب‌ترین نقطه عکاسی کیش است — بویژه هنگام غروب.',
      en: 'Grounding site of Greek cargo ship "Captain Kostas" since 1966 — Kish\'s most photographed landmark, especially at sunset.',
    },
    guide: { fa: 'بازدید رایگان. بهترین زمان: غروب آفتاب.', en: 'Free entry. Best time: sunset.' },
    contact: {
      hours: { fa: 'همیشه باز (فضای باز)', en: 'Always open (outdoor site)' },
    },
    images: [{ src: 'https://picsum.photos/seed/greekship/800/500', alt: 'Greek Ship Kish' }],
  },

  {
    id: 'harireh-ancient',
    category: 'amenity',
    coordinates: [53.9108, 26.5790],
    name: { fa: 'شهر باستانی حریره', en: 'Harireh Ancient City' },
    address: { fa: 'شمال غرب کیش، جاده حریره', en: 'NW Kish, Harireh Rd' },
    description: {
      fa: 'بقایای پایتخت قرن دوم تا هفتم هجری کیش با جمعیت ۴۰٬۰۰۰ نفری. حمام‌ها، مساجد و خانه‌های تاریخی هنوز قابل مشاهده‌اند.',
      en: 'Ruins of Kish\'s medieval capital, once home to 40,000 people — historic baths, mosques, and homes still visible.',
    },
    guide: { fa: 'بازدید رایگان. بهترین زمان: ساعت طلایی غروب.', en: 'Free entry. Best time: golden hour at sunset.' },
    contact: {
      hours: { fa: 'هر روز ۸ صبح تا ۸ شب', en: 'Daily 8 AM – 8 PM' },
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
    guide: { fa: 'ورودیه اندک. راهنمای فارسی و انگلیسی موجود است.', en: 'Small entry fee. Persian and English guides available.' },
    contact: {
      phone: '076-44441500',
      hours: { fa: 'شنبه–چهارشنبه ۹–۱۷ | پنجشنبه ۹–۱۳ | جمعه تعطیل', en: 'Sat–Wed 9–17 | Thu 9–13 | Fri Closed' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishmuseum/800/500', alt: 'Kish Anthropology Museum' }],
  },

  {
    id: 'safa-house',
    category: 'amenity',
    coordinates: [53.9065, 26.5625],
    name: { fa: 'خانه تاریخی صفا', en: 'Safa Historical House' },
    address: { fa: 'روستای قدیمی صفا، کیش', en: 'Old Safa Village, Kish' },
    description: {
      fa: 'خانه اصیل بومی کیش متعلق به دوران قاجار با معماری بادگیر، دیوارهای آهک‌پوش و حیاط مرکزی.',
      en: 'Authentic Qajar-era home with traditional wind-tower architecture, lime-plastered walls, and a central courtyard.',
    },
    guide: { fa: 'بازدید رایگان. راهنمای محلی موجود است.', en: 'Free entry. Local guides available.' },
    contact: {
      hours: { fa: 'هر روز ۹ صبح تا ۶ عصر', en: 'Daily 9 AM – 6 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/safahouse/800/500', alt: 'Safa Historical House Kish' }],
  },

  // ════ NATURE & AQUARIUM ════════════════════════════════════

  {
    id: 'kish-aquarium',
    category: 'amenity',
    coordinates: [53.9440, 26.568],
    name: { fa: 'آکواریوم کیش', en: 'Kish Aquarium' },
    address: { fa: 'شمال غرب کیش، مجاور پارک ساحلی', en: 'NW Kish, near Coastal Park' },
    description: {
      fa: 'بیش از ۱۰۰ گونه آبزی خلیج فارس: کوسه، لاک‌پشت دریایی، اختاپوس و مرجان زنده. تونل شیشه‌ای ۲۰ متری.',
      en: '100+ Persian Gulf species — reef sharks, sea turtles, octopus, live coral. 20-metre glass walk-through tunnel.',
    },
    guide: { fa: 'تغذیه کوسه شنبه‌ها ۴ عصر. خرید آنلاین بلیط توصیه می‌شود.', en: 'Shark feeding: Saturdays at 4 PM. Online ticket purchase recommended.' },
    contact: {
      phone: '076-44442000',
      hours: { fa: 'هر روز ۹ صبح تا ۹ شب', en: 'Daily 9 AM – 9 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishaquarium/800/500', alt: 'Kish Aquarium' }],
    ticketUrl: 'https://kishview.com',
  },

  {
    id: 'bird-garden',
    category: 'amenity',
    coordinates: [53.9521, 26.570],
    name: { fa: 'باغ پرندگان کیش', en: 'Kish Bird Garden' },
    address: { fa: 'بلوار میرزاکوچک‌خان، کیش', en: 'Mirzakuchekhan Blvd, Kish' },
    description: {
      fa: 'باغ پرندگان گرمسیری با بیش از ۳۰۰ گونه از سراسر جهان در محیط‌های طبیعی سرسبز.',
      en: '300+ tropical bird species from around the world in lush naturalistic enclosures.',
    },
    guide: { fa: 'بلیط خانوادگی صرفه‌جویی دارد. بهترین وقت: صبح که پرندگان فعال‌ترند.', en: 'Family tickets save money. Best time: morning when birds are most active.' },
    contact: {
      phone: '076-44442500',
      hours: { fa: 'هر روز ۸ صبح تا ۸ شب', en: 'Daily 8 AM – 8 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishbirds/800/500', alt: 'Kish Bird Garden' }],
    ticketUrl: 'https://kishview.com',
  },

  // ════ ENTERTAINMENT & SPORTS ══════════════════════════════

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
    guide: { fa: 'کفش کرایه‌ای موجود. در ایام تعطیل از قبل رزرو کنید.', en: 'Shoe rental available. Reserve in advance on holidays.' },
    contact: {
      phone: '076-44443000',
      hours: { fa: 'هر روز ۱۰ صبح تا ۲ بامداد', en: 'Daily 10 AM – 2 AM' },
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
    guide: { fa: 'بلیط جداگانه برای هر وسیله. مناسب کودکان ۳–۱۲ سال.', en: 'Separate ticket per ride. Best suited for children aged 3–12.' },
    contact: {
      phone: '076-44443500',
      hours: { fa: 'هر روز ۵ عصر تا ۱۲ شب', en: 'Daily 5 PM – midnight' },
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
    guide: { fa: 'ورودی رایگان. دوچرخه کرایه‌ای در ورودی اصلی موجود است.', en: 'Free entry. Bike rental available at the main entrance.' },
    contact: {
      hours: { fa: 'هر روز ۶ صبح تا ۱۰ شب', en: 'Daily 6 AM – 10 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/parvazpark/800/500', alt: 'Parvaz Park Kish' }],
  },

  // ════ CAFÉS & RESTAURANTS ══════════════════════════════════

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
    guide: { fa: 'رزرو میز برای غروب توصیه می‌شود. وای‌فای رایگان.', en: 'Table reservation recommended for sunset. Free Wi-Fi.' },
    contact: {
      phone: '076-44444000',
      instagram: '@caferose_kish',
      hours: { fa: 'هر روز ۷ صبح تا ۱۱ شب', en: 'Daily 7 AM – 11 PM' },
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
    guide: { fa: 'رزرو سفره ضروری در ایام تعطیل. منوی تصویری موجود.', en: 'Reservation essential on holidays. Picture menu available.' },
    contact: {
      phone: '076-44445000',
      hours: { fa: 'هر روز ۱۲ ظهر تا ۱۱ شب', en: 'Daily noon – 11 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/zeiytoon/800/500', alt: 'Zeiytoon Restaurant Kish' }],
  },

  {
    id: 'darya-cafe',
    category: 'cafe',
    coordinates: [53.9558, 26.572],
    name: { fa: 'کافه دریا', en: 'Darya Café' },
    address: { fa: 'ساحل شمالی، کیش', en: 'North Shore, Kish' },
    description: {
      fa: 'کافه مدرن با پنجره‌های پانوراما رو به خلیج فارس، صبحانه انگلیسی، موکتیل و کیک‌های خانگی.',
      en: 'Modern café with panoramic Persian Gulf windows, full English breakfast, mocktails, and home-baked cakes.',
    },
    guide: { fa: 'صبحانه تا ساعت ۱۱. میز کنار پنجره را از قبل رزرو کنید.', en: 'Breakfast until 11 AM. Reserve a window table in advance.' },
    contact: {
      phone: '076-44446000',
      instagram: '@daryacafe_kish',
      hours: { fa: 'هر روز ۷ صبح تا ۱۲ شب', en: 'Daily 7 AM – midnight' },
    },
    images: [{ src: 'https://picsum.photos/seed/daryacafe/800/500', alt: 'Darya Café Kish' }],
  },
];
