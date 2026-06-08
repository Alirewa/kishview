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
} as const;

export default fa;
export type Translations = Record<keyof typeof fa, string>;
