const fa = {
  appName: 'کیش ویو',
  guide: 'راهنما',
  addPlace: 'افزودن مکان',
  addPlaceTitle: 'ثبت کسب‌وکار',
  addPlaceBody:
    'برای ثبت مکان یا کسب‌وکار خود در KishView، لطفاً پس از تأیید هویت و بررسی توسط تیم ما، از طریق پیام مستقیم با ادمین در ارتباط باشید.',
  addPlaceContact: 'ادمین: @Alirewa',
  buyTicket: 'خرید بلیط',
  lang: 'EN',
  darkMode: 'تاریک',
  lightMode: 'روشن',
  close: 'بستن',
  menu: 'منو',
  viewDetails: 'مشاهده جزئیات',
  address: 'آدرس',
  website: 'وب‌سایت',
  navigate: 'مسیریابی',
  info: 'اطلاعات',
  phone: 'تلفن',
  hours: 'ساعات کاری',
  instagram: 'اینستاگرام',
  notInKish: 'موقعیت فعلی شما در کیش شناسایی نشد',
  locationDenied: 'دسترسی به موقعیت مکانی امکان‌پذیر نیست',
  locating: 'در حال تعیین موقعیت...',
  backToCard: 'بازگشت',
  placeInfo: 'اطلاعات مکان',
} as const;

export default fa;
export type Translations = Record<keyof typeof fa, string>;
