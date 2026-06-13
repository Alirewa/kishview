// Developed by @Alirewa — github.com/Alirewa
import type { Place } from '@/types';

// Coordinates verified against OpenStreetMap / Nominatim data.
// Format: [longitude, latitude]

export const places: Place[] = [

  // ════ SHOPPING ════════════════════════════════════════════

  {
    id: 'mikamall',
    category: 'shopping',
    coordinates: [54.0246, 26.5369],
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
    coordinates: [53.9600, 26.5550],
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
    coordinates: [53.9515, 26.5525],
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
    coordinates: [53.9550, 26.5505],
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
    coordinates: [54.0120, 26.5430],
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
    coordinates: [54.0276, 26.5351],
    name: { fa: 'هتل بزرگ داریوش', en: 'Dariush Grand Hotel' },
    address: { fa: 'بلوار داریوش، کیش', en: 'Dariush Blvd, Kish' },
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
    images: [{ src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dariush_Grand_Hotel_-_2.jpg/800px-Dariush_Grand_Hotel_-_2.jpg', alt: 'Dariush Grand Hotel Kish' }],
  },

  {
    id: 'flamingo-hotel',
    category: 'hotel',
    coordinates: [54.0152, 26.5473],
    name: { fa: 'هتل فلامینگو', en: 'Flamingo Hotel' },
    address: { fa: 'ساحل شمالی، کیش', en: 'North Shore, Kish' },
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
  },

  {
    id: 'parmis-hotel',
    category: 'hotel',
    coordinates: [54.0185, 26.5366],
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
  },

  {
    id: 'shayan-hotel',
    category: 'hotel',
    coordinates: [54.0208, 26.5462],
    name: { fa: 'هتل بین‌المللی شایان', en: 'Shayan International Hotel' },
    address: { fa: 'بلوار ساحلی، کیش', en: 'Coastal Boulevard, Kish' },
    description: {
      fa: 'هتل پنج‌ستاره بین‌المللی با استخر ساحلی، رستوران‌های متعدد، سالن همایش و دسترسی مستقیم به ساحل خلیج فارس.',
      en: 'Five-star international hotel with beach pool, multiple restaurants, conference halls, and direct Persian Gulf beach access.',
    },
    guide: { fa: 'رزرو آنلاین توصیه می‌شود. پارکینگ رایگان برای مهمانان.', en: 'Online booking recommended. Free parking for guests.' },
    contact: {
      phone: '076-44444100',
      website: 'shayanhotel.com',
      hours: { fa: 'پذیرش ۲۴ ساعته', en: '24-hour reception' },
    },
    images: [{ src: 'https://picsum.photos/seed/shayanhotel/800/500', alt: 'Shayan International Hotel Kish' }],
  },

  {
    id: 'tamasha-hotel',
    category: 'hotel',
    coordinates: [54.0159, 26.5431],
    name: { fa: 'هتل تماشا', en: 'Tamasha Hotel' },
    address: { fa: 'بلوار ساحلی، کیش', en: 'Coastal Boulevard, Kish' },
    description: {
      fa: 'هتل بوتیک مدرن با طراحی معاصر، مشرف به خلیج فارس. رستوران بام، اسپا، استخر و فضای خصوصی ساحلی.',
      en: 'Modern boutique hotel with contemporary design overlooking the Persian Gulf — rooftop restaurant, spa, pool, and private beach.',
    },
    guide: { fa: 'رستوران بام برای غروب بسیار محبوب است. رزرو از قبل لازم است.', en: 'Rooftop restaurant is very popular at sunset. Advance reservation required.' },
    contact: {
      phone: '076-44444200',
      hours: { fa: 'پذیرش ۲۴ ساعته', en: '24-hour reception' },
    },
    images: [{ src: 'https://picsum.photos/seed/tamashahotel/800/500', alt: 'Tamasha Hotel Kish' }],
  },

  {
    id: 'toranj-hotel',
    category: 'hotel',
    coordinates: [54.0230, 26.5500],
    name: { fa: 'هتل ترنج کیش', en: 'Toranj Kish Hotel' },
    address: { fa: 'ساحل شمالی، کیش', en: 'North Shore, Kish' },
    description: {
      fa: 'هتل بوتیک لوکس با معماری منحصربه‌فرد مشرف به خلیج فارس. رستوران بام با دید ۳۶۰ درجه، اسپا، استخر اینفینیتی و دکوراسیون هنری مدرن.',
      en: 'Luxury boutique hotel with unique architecture overlooking the Persian Gulf — rooftop restaurant with 360° views, spa, infinity pool, and modern art décor.',
    },
    guide: { fa: 'رزرو مستقیم برای بهترین قیمت. اتاق رو به دریا توصیه می‌شود.', en: 'Direct booking for best rates. Sea-view rooms recommended.' },
    contact: {
      phone: '076-44445100',
      website: 'toranjkish.com',
      hours: { fa: 'پذیرش ۲۴ ساعته', en: '24-hour reception' },
    },
    images: [{ src: 'https://picsum.photos/seed/toranjkish/800/500', alt: 'Toranj Kish Hotel' }],
  },

  {
    id: 'setareh-kish-hotel',
    category: 'hotel',
    coordinates: [54.0272, 26.5321],
    name: { fa: 'هتل ستاره کیش', en: 'Setareh Kish Hotel' },
    address: { fa: 'بلوار داریوش، کیش', en: 'Dariush Boulevard, Kish' },
    description: {
      fa: 'هتل چهارستاره با موقعیت ممتاز نزدیک هتل داریوش، استخر، رستوران و اتاق‌های رو به دریا.',
      en: 'Four-star hotel in a prime location near Dariush Hotel — pool, restaurant, and sea-view rooms.',
    },
    guide: { fa: 'نزدیک به مجتمع تفریحی داریوش. دسترسی آسان با تاکسی.', en: 'Close to the Dariush entertainment complex. Easy taxi access.' },
    contact: {
      phone: '076-44444300',
      hours: { fa: 'پذیرش ۲۴ ساعته', en: '24-hour reception' },
    },
    images: [{ src: 'https://picsum.photos/seed/setarehkish/800/500', alt: 'Setareh Kish Hotel' }],
  },

  // ════ BEACHES & WATER ═════════════════════════════════════

  {
    id: 'coral-beach',
    category: 'water-sports',
    coordinates: [53.9520, 26.4870],
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
    ticketUrl: '/tickets/coral-beach-snorkel',
  },

  {
    id: 'sadaf-beach',
    category: 'water-sports',
    coordinates: [54.0020, 26.4960],
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
    coordinates: [54.0376, 26.5096],
    name: { fa: 'پارک دلفین‌ها', en: 'Dolphin Park' },
    address: { fa: 'ساحل جنوب شرقی، کیش', en: 'Southeast Shore, Kish' },
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
    ticketUrl: '/tickets/dolphin-park',
  },

  {
    id: 'diving-pier',
    category: 'water-sports',
    coordinates: [53.9150, 26.5700],
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
    ticketUrl: '/tickets/diving',
  },

  // ════ WATER SPORTS & ADVENTURES ═══════════════════════════

  {
    id: 'ocean-water-park',
    category: 'water-sports',
    coordinates: [53.9806, 26.4972],
    name: { fa: 'پارک آبی اوشن', en: 'Ocean Water Park' },
    address: { fa: 'ساحل جنوبی کیش', en: 'South Shore, Kish' },
    description: {
      fa: 'بزرگ‌ترین پارک آبی سرپوشیده ایران با اسلایدهای هیجان‌انگیز، استخر موج، جکوزی و رودخانه تنبل. انتقال رایگان از سراسر جزیره.',
      en: 'Iran\'s largest indoor water park — thrilling slides, wave pool, jacuzzi, and lazy river. Free shuttle from across the island.',
    },
    guide: { fa: 'مایو اجباری. لاکر رایگان. بهترین وقت: اوایل صبح.', en: 'Swimwear required. Free lockers. Best time: early morning.' },
    contact: {
      phone: '076-44447000',
      hours: { fa: 'هر روز ۱۰ صبح تا ۱۰ شب', en: 'Daily 10 AM – 10 PM' },
    },
    images: [{ src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Anaconda_2.jpg/800px-Anaconda_2.jpg', alt: 'Ocean Water Park Kish' }],
    ticketUrl: '/tickets/ocean-water-park',
  },

  {
    id: 'parasail',
    category: 'water-sports',
    coordinates: [54.0340, 26.5120],
    name: { fa: 'پاراسل کیش', en: 'Parasailing Kish' },
    address: { fa: 'ساحل جنوب شرقی، نزدیک اسکله، کیش', en: 'SE Shore, near the pier, Kish' },
    description: {
      fa: 'پرواز با چتر بادبانی بر فراز خلیج فارس در ارتفاع ۱۰۰ متری. منظره ۳۶۰ درجه به جزیره کیش از آسمان. مناسب از ۱۲ سال.',
      en: 'Soar 100 metres above the Persian Gulf with a parasail. 360° aerial view of Kish Island. Suitable from age 12.',
    },
    guide: { fa: 'تجهیزات ایمنی کامل. مربی همراه. مناسب مبتدی.', en: 'Full safety gear provided. Instructor present. Beginner-friendly.' },
    contact: {
      hours: { fa: 'هر روز ۹ صبح تا ۶ عصر', en: 'Daily 9 AM – 6 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/parasailkish/800/500', alt: 'Parasailing Kish' }],
    ticketUrl: '/tickets/parasail',
  },

  {
    id: 'flyboard',
    category: 'water-sports',
    coordinates: [54.0325, 26.5110],
    name: { fa: 'فلای‌بورد کیش', en: 'Flyboard Kish' },
    address: { fa: 'ساحل جنوب شرقی، کیش', en: 'SE Shore, Kish' },
    description: {
      fa: 'پرواز روی آب با جت واتر — هیجان‌انگیزترین ورزش آبی کیش. آموزش ۱۵ دقیقه‌ای رایگان، سپس پرواز آزاد. مناسب از ۱۵ سال.',
      en: 'Fly above the water on a jet-powered board — Kish\'s most thrilling water sport. 15-min free training, then free flight. Ages 15+.',
    },
    guide: { fa: 'توانایی شنا الزامی. جلیقه نجات ارائه می‌شود.', en: 'Swimming ability required. Life vest provided.' },
    contact: {
      hours: { fa: 'هر روز ۹ صبح تا ۶ عصر', en: 'Daily 9 AM – 6 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/flyboardkish/800/500', alt: 'Flyboard Kish' }],
    ticketUrl: '/tickets/flyboard',
  },

  {
    id: 'banana-boat',
    category: 'water-sports',
    coordinates: [54.0330, 26.5115],
    name: { fa: 'بنانا بوت کیش', en: 'Banana Boat Kish' },
    address: { fa: 'ساحل جنوب شرقی، کیش', en: 'SE Shore, Kish' },
    description: {
      fa: 'هیجان روی موج با قایق موزی — مناسب خانواده و دوستان. ۱۵ دقیقه اکشن روی امواج خلیج فارس. کودک از ۵ سال.',
      en: 'Thrilling wave ride on an inflatable banana boat — great for families and groups. 15 min of action on the Persian Gulf. Ages 5+.',
    },
    guide: { fa: 'جلیقه نجات اجباری. بهتر است لباس آب‌بندی بپوشید.', en: 'Life vest mandatory. Wear water-resistant clothing.' },
    contact: {
      hours: { fa: 'هر روز ۹ صبح تا ۶ عصر', en: 'Daily 9 AM – 6 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/bananaboatkish/800/500', alt: 'Banana Boat Kish' }],
    ticketUrl: '/tickets/banana-boat',
  },

  {
    id: 'aquarium-boat',
    category: 'water-sports',
    coordinates: [53.9200, 26.5650],
    name: { fa: 'کشتی آکواریوم', en: 'Glass Bottom Boat' },
    address: { fa: 'اسکله تفریحی شمال غربی، کیش', en: 'NW Marina, Kish' },
    description: {
      fa: 'کشتی شیشه‌ای کف‌دار با تماشای مرجان‌ها و ماهی‌های رنگارنگ بدون خیس شدن. مناسب تمام سنین، ۲ ساعت دریانوردی لذت‌بخش.',
      en: 'Glass-bottom boat for viewing corals and colourful fish without getting wet. Suitable for all ages, 2-hour cruise.',
    },
    guide: { fa: 'صبح دید بهتری دارد. کرم ضد آفتاب فراموش نشود.', en: 'Morning offers the clearest water. Don\'t forget sunscreen.' },
    contact: {
      hours: { fa: 'هر روز ۸ صبح تا ۸ شب', en: 'Daily 8 AM – 8 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/aquariumboat/800/500', alt: 'Glass Bottom Boat Kish' }],
    ticketUrl: '/tickets/aquarium-boat',
  },

  // ════ HISTORICAL & CULTURAL ════════════════════════════════

  {
    id: 'greek-ship',
    category: 'amenity',
    coordinates: [53.9082, 26.5262],
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
    images: [{ src: 'https://upload.wikimedia.org/wikipedia/en/8/8e/The_Greek_Ship.jpg', alt: 'Greek Ship Kish' }],
  },

  {
    id: 'harireh-ancient',
    category: 'amenity',
    coordinates: [53.9741, 26.5669],
    name: { fa: 'شهر باستانی حریره', en: 'Harireh Ancient City' },
    address: { fa: 'شمال کیش، جاده حریره', en: 'North Kish, Harireh Rd' },
    description: {
      fa: 'بقایای پایتخت قرن دوم تا هفتم هجری کیش با جمعیت ۴۰٬۰۰۰ نفری. حمام‌ها، مساجد و خانه‌های تاریخی هنوز قابل مشاهده‌اند.',
      en: 'Ruins of Kish\'s medieval capital, once home to 40,000 people — historic baths, mosques, and homes still visible.',
    },
    guide: { fa: 'بازدید رایگان. بهترین زمان: ساعت طلایی غروب.', en: 'Free entry. Best time: golden hour at sunset.' },
    contact: {
      hours: { fa: 'هر روز ۸ صبح تا ۸ شب', en: 'Daily 8 AM – 8 PM' },
    },
    images: [{ src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/%D8%B4%D9%87%D8%B1_%D8%A8%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%DB%8C_%D8%AD%D8%B1%DB%8C%D8%B1%D9%87_-_%D9%86%D9%85%D8%A7%D9%87%D8%A7%DB%8C_%DA%AF%D9%88%D9%86%D8%A7%DA%AF%D9%88%D9%86_%D8%AD%D8%B1%DB%8C%D8%B1%D9%87_%D9%88_%D9%BE%D8%A7%DB%8C%D8%A7%D8%A8_07.jpg/800px-%D8%B4%D9%87%D8%B1_%D8%A8%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%DB%8C_%D8%AD%D8%B1%DB%8C%D8%B1%D9%87_-_%D9%86%D9%85%D8%A7%D9%87%D8%A7%DB%8C_%DA%AF%D9%88%D9%86%D8%A7%DA%AF%D9%88%D9%86_%D8%AD%D8%B1%DB%8C%D8%B1%D9%87_%D9%88_%D9%BE%D8%A7%DB%8C%D8%A7%D8%A8_07.jpg', alt: 'Harireh Ancient City Kish' }],
  },

  {
    id: 'kish-kariz',
    category: 'amenity',
    coordinates: [53.9687, 26.5566],
    name: { fa: 'کاریز زیرزمینی کیش', en: 'Kish Underground Qanat' },
    address: { fa: 'مرکز کیش، روبروی هتل شایان', en: 'Central Kish, opposite Shayan Hotel' },
    description: {
      fa: 'شبکه آبرسانی ۲۵۰۰ ساله زیرزمینی جزیره کیش — یکی از مهم‌ترین آثار تاریخی خلیج فارس با محوطه فرهنگی، گالری و فضاهای نمایشگاهی.',
      en: 'A 2,500-year-old underground water channel system — one of the Persian Gulf\'s most important historic sites, with a cultural complex, gallery, and exhibition spaces.',
    },
    guide: { fa: 'دما در داخل کاریز خنک است. کفش راحت بپوشید.', en: 'The qanat interior is cool. Wear comfortable shoes.' },
    contact: {
      phone: '076-44448000',
      hours: { fa: 'هر روز ۹ صبح تا ۹ شب', en: 'Daily 9 AM – 9 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishkariz/800/500', alt: 'Kish Underground Qanat' }],
    ticketUrl: '/tickets/kish-kariz',
  },

  {
    id: 'anthropology-museum',
    category: 'amenity',
    coordinates: [53.9426, 26.5709],
    name: { fa: 'موزه مردم‌شناسی کیش', en: 'Kish Anthropology Museum' },
    address: { fa: 'شمال غرب کیش، نزدیک ساحل', en: 'NW Kish, near the coast' },
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


  // ════ NATURE & AQUARIUM ════════════════════════════════════

  {
    id: 'kish-aquarium',
    category: 'amenity',
    coordinates: [54.0390, 26.5051],
    name: { fa: 'آکواریوم کیش', en: 'Kish Aquarium' },
    address: { fa: 'ساحل جنوب شرقی، کیش', en: 'SE Shore, Kish' },
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
    ticketUrl: '/tickets/kish-aquarium',
  },


  // ════ ENTERTAINMENT & SPORTS ══════════════════════════════

  {
    id: 'kish-bowling',
    category: 'land-sports',
    coordinates: [54.0202, 26.5476],
    name: { fa: 'بولینگ کیش', en: 'Kish Bowling Center' },
    address: { fa: 'مجموعه تفریحی، کیش', en: 'Entertainment Complex, Kish' },
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
  },

  {
    id: 'luna-park',
    category: 'land-sports',
    coordinates: [54.0175, 26.5445],
    name: { fa: 'لوناپارک کیش', en: 'Kish Luna Park' },
    address: { fa: 'بلوار تفریحی، کیش', en: 'Entertainment Blvd, Kish' },
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
  },

  {
    id: 'snow-park',
    category: 'land-sports',
    coordinates: [54.0246, 26.5369],
    name: { fa: 'پارک برفی کیش', en: 'Kish Snow Park' },
    address: { fa: 'مجموعه میکامال، طبقه پنجم، کیش', en: 'Mikamall, 5th Floor, Kish' },
    description: {
      fa: 'تنها پیست اسکی سرپوشیده در خاورمیانه با دمای زیر صفر! اسکی، بورد برفی، بازی برفی و کوچینگ حرفه‌ای در جزیره‌ای گرم‌سیری.',
      en: 'The only indoor ski slope in the Middle East — sub-zero temperatures! Ski, snowboard, and snow play with professional coaching.',
    },
    guide: { fa: 'لباس گرم کرایه‌ای موجود. سانس‌ها ظرفیت محدود دارند.', en: 'Warm clothing rental available. Sessions have limited capacity.' },
    contact: {
      phone: '076-44441200',
      hours: { fa: 'هر روز ۱۰ صبح تا ۱۰ شب', en: 'Daily 10 AM – 10 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishsnow/800/500', alt: 'Kish Snow Park' }],
    ticketUrl: '/tickets/snow-park',
  },

  {
    id: 'ice-rink',
    category: 'land-sports',
    coordinates: [54.0250, 26.5378],
    name: { fa: 'آیس رینک کیش', en: 'Kish Ice Rink' },
    address: { fa: 'مجموعه میکامال، طبقه سوم، کیش', en: 'Mikamall, 3rd Floor, Kish' },
    description: {
      fa: 'پیست یخ‌بازی حرفه‌ای در قلب کیش. اسکیت روی یخ با کفش کرایه‌ای، آموزش مقدماتی و موسیقی زنده در اتمسفر یخ‌زده.',
      en: 'Professional ice rink in the heart of Kish — skate with rental boots, beginner lessons, and live music in an icy atmosphere.',
    },
    guide: { fa: 'کفش اسکیت کرایه شامل بلیط است. دستکش پیشنهادی.', en: 'Skate rental included in ticket price. Gloves recommended.' },
    contact: {
      phone: '076-44441200',
      hours: { fa: 'هر روز ۱۰ صبح تا ۱۰ شب', en: 'Daily 10 AM – 10 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishicerink/800/500', alt: 'Kish Ice Rink' }],
    ticketUrl: '/tickets/ice-rink',
  },

  {
    id: 'theme-park-center',
    category: 'land-sports',
    coordinates: [54.0170, 26.5450],
    name: { fa: 'تم پارک سنتر', en: 'Theme Park Center' },
    address: { fa: 'مجتمع تفریحی کیش', en: 'Entertainment Complex, Kish' },
    description: {
      fa: 'بزرگ‌ترین مجموعه بازی‌های فانتزی کیش با ۱۵ دستگاه شهربازی، VR، اتاق‌های فرار، بازی‌های گروهی و فودکورت.',
      en: 'Kish\'s largest fantasy games complex — 15 rides, VR, escape rooms, group games, and a food court.',
    },
    guide: { fa: 'بلیط خانوادگی صرفه‌جویی بیشتری دارد. مناسب همه سنین.', en: 'Family ticket offers best value. Suitable for all ages.' },
    contact: {
      phone: '076-44444500',
      hours: { fa: 'هر روز ۱۱ صبح تا ۱۲ شب', en: 'Daily 11 AM – midnight' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishthemepark/800/500', alt: 'Theme Park Center Kish' }],
    ticketUrl: '/tickets/theme-park-center',
  },

  {
    id: 'horror-castle',
    category: 'land-sports',
    coordinates: [54.0155, 26.5455],
    name: { fa: 'قلعه وحشت کیش', en: 'Kish Horror Castle' },
    address: { fa: 'مجتمع تفریحی، کیش', en: 'Entertainment Complex, Kish' },
    description: {
      fa: 'بزرگ‌ترین قلعه وحشت ایران با بیش از ۲۰ اتاق پر از ترس و تاریکی، جلوه‌های صوتی و تصویری پیشرفته. مناسب افراد بالای ۱۲ سال.',
      en: 'Iran\'s largest horror castle — 20+ rooms of dark terror with advanced audio-visual effects. Ages 12+.',
    },
    guide: { fa: 'مناسب افراد بالای ۱۲ سال. بیماران قلبی وارد نشوند.', en: 'Ages 12+ only. Not suitable for those with heart conditions.' },
    contact: {
      hours: { fa: 'هر روز ۴ عصر تا ۱۱ شب', en: 'Daily 4 PM – 11 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishhorror/800/500', alt: 'Kish Horror Castle' }],
    ticketUrl: '/tickets/horror-castle',
  },

  // ════ ADVENTURE SPORTS ════════════════════════════════════

  {
    id: 'bungee-jumping',
    category: 'land-sports',
    coordinates: [54.0350, 26.5105],
    name: { fa: 'بانجی جامپینگ و زیپ‌لاین', en: 'Bungee Jumping & Zipline' },
    address: { fa: 'ساحل جنوب شرقی، نزدیک پارک دلفین، کیش', en: 'SE Shore, near Dolphin Park, Kish' },
    description: {
      fa: 'هیجان‌انگیزترین ورزش ماجراجویی کیش — پرش از ارتفاع ۴۰ متری بر فراز خلیج فارس. تجهیزات ایمنی استاندارد اروپایی.',
      en: 'Kish\'s most thrilling adventure sport — 40-metre jump over the Persian Gulf. European-standard safety equipment.',
    },
    guide: { fa: 'حداقل وزن ۴۰ کیلو، حداکثر ۱۲۰ کیلو. مناسب از ۱۶ سال.', en: 'Min weight 40 kg, max 120 kg. Suitable from age 16.' },
    contact: {
      hours: { fa: 'هر روز ۱۰ صبح تا ۸ شب', en: 'Daily 10 AM – 8 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/bungeekish/800/500', alt: 'Bungee Jumping Kish' }],
    ticketUrl: '/tickets/bungee-jumping',
  },


  {
    id: 'wind-tunnel',
    category: 'land-sports',
    coordinates: [54.0190, 26.5480],
    name: { fa: 'تونل باد کیش', en: 'Kish Wind Tunnel' },
    address: { fa: 'مجتمع تفریحی میکا، کیش', en: 'Mika Entertainment Complex, Kish' },
    description: {
      fa: 'تجربه سقوط آزاد بدون هواپیما در تونل باد حرفه‌ای. سرعت باد ۱۵۰ کیلومتر در ساعت، احساس واقعی شیرجه هوایی. مناسب از ۷ سال.',
      en: 'Experience indoor skydiving without an aircraft — 150 km/h wind speed, real freefall sensation. Suitable from age 7.',
    },
    guide: { fa: 'آموزش ۱۵ دقیقه‌ای قبل از پرواز. مربی همراه در داخل تونل.', en: '15-minute training before flight. Instructor accompanies you inside the tunnel.' },
    contact: {
      hours: { fa: 'هر روز ۱۰ صبح تا ۱۰ شب', en: 'Daily 10 AM – 10 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/windtunnelkish/800/500', alt: 'Kish Wind Tunnel' }],
    ticketUrl: '/tickets/wind-tunnel',
  },

  {
    id: 'cable-car',
    category: 'land-sports',
    coordinates: [54.0227, 26.5474],
    name: { fa: 'تله‌کابین کیش', en: 'Kish Cable Car' },
    address: { fa: 'مجموعه میکا، کیش', en: 'Mika Complex, Kish' },
    description: {
      fa: 'تله‌کابین هوایی با منظره ۳۶۰ درجه به سراسر جزیره کیش و خلیج فارس. مسیر طلایی غروب آفتاب بر فراز جزیره.',
      en: '360° aerial gondola overlooking all of Kish Island and the Persian Gulf. Spectacular at golden-hour sunset.',
    },
    guide: { fa: 'سانس غروب پرطرفدارتر است. از قبل بلیط بگیرید.', en: 'Evening sessions are most popular. Book tickets in advance.' },
    contact: {
      hours: { fa: 'هر روز ۱۰ صبح تا ۱۰ شب', en: 'Daily 10 AM – 10 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishcablecar/800/500', alt: 'Kish Cable Car' }],
    ticketUrl: '/tickets/cable-car',
  },

  // ════ TOURS & SIGHTSEEING ══════════════════════════════════

  {
    id: 'island-tour',
    category: 'amenity',
    coordinates: [54.0205, 26.5445],
    name: { fa: 'گشت جزیره کیش', en: 'Kish Island Tour' },
    address: { fa: 'میدان مرکزی، کیش', en: 'Central Square, Kish' },
    description: {
      fa: 'تور کامل جزیره با مینی‌بوس مسقف — بازدید از ۱۲ نقطه دیدنی: کشتی یونانی، حریره، خانه صفا، کاریز، پارک ملی دریایی و بیشتر. راهنمای فارسی.',
      en: 'Full island tour by covered minibus — visit 12 sights: Greek Ship, Harireh, Safa House, Qanat, Marine National Park and more. Persian guide.',
    },
    guide: { fa: 'صبح زودتر حرکت کنید تا گرمای کمتری داشته باشید.', en: 'Morning departure recommended to avoid the peak heat.' },
    contact: {
      hours: { fa: 'هر روز ۸ صبح تا ۷ عصر', en: 'Daily 8 AM – 7 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishislandtour/800/500', alt: 'Kish Island Tour' }],
    ticketUrl: '/tickets/island-tour',
  },

  {
    id: 'double-decker-bus',
    category: 'amenity',
    coordinates: [54.0210, 26.5440],
    name: { fa: 'اتوبوس دوطبقه گردشگری', en: 'Double-Decker Tour Bus' },
    address: { fa: 'میدان مرکزی، کیش', en: 'Central Square, Kish' },
    description: {
      fa: 'تور اتوبوسی دوطبقه روباز — بهترین روش دیدن جاذبه‌های کیش از بالا. بلندگوی راهنمای دوزبانه فارسی و انگلیسی، توقف در ۸ نقطه.',
      en: 'Open-top double-decker bus tour — the best way to see Kish from above. Bilingual audio guide (FA/EN), stops at 8 attractions.',
    },
    guide: { fa: 'طبقه بالا بهترین دید را دارد. کرم ضد آفتاب فراموش نشود.', en: 'Upper deck has the best views. Don\'t forget sunscreen.' },
    contact: {
      hours: { fa: 'هر روز ۹ صبح تا ۸ شب', en: 'Daily 9 AM – 8 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishbus/800/500', alt: 'Double-Decker Tour Bus Kish' }],
    ticketUrl: '/tickets/double-decker-bus',
  },

  // ════ NIGHT SHOWS ══════════════════════════════════════════

  {
    id: 'night-shows',
    category: 'amenity',
    coordinates: [54.0165, 26.5462],
    name: { fa: 'مجتمع نمایش‌های شبانه', en: 'Night Shows Complex' },
    address: { fa: 'ساحل شمالی، کیش', en: 'North Shore, Kish' },
    description: {
      fa: 'مجموعه نمایش‌های شبانه کیش با سه شو برتر: پازل شو، ایرانیا شو و پرشین شو. بهترین سرگرمی شبانه جنوب ایران.',
      en: 'Kish\'s premier night entertainment complex — three top shows: Puzzle Show, Iraniya Show, and Persian Show.',
    },
    guide: { fa: 'رزرو از قبل الزامی در تعطیلات. جای پارک محدود.', en: 'Advance booking required on holidays. Limited parking.' },
    contact: {
      hours: { fa: 'هر روز از ساعت ۸ شب', en: 'Daily from 8 PM' },
    },
    images: [{ src: 'https://picsum.photos/seed/kishnight/800/500', alt: 'Night Shows Complex Kish' }],
    ticketUrl: '/tickets/night-show-puzzle',
  },

  // ════ PARKS ════════════════════════════════════════════════

  {
    id: 'parvaz-park',
    category: 'amenity',
    coordinates: [53.9640, 26.5555],
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
    coordinates: [54.0260, 26.5390],
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
    coordinates: [53.9615, 26.5510],
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
    coordinates: [53.9530, 26.5650],
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
