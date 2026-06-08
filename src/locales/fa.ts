const fa = {
  appName: 'نقشه کیش',
  guide: 'راهنمای استفاده',
  addPlace: '+ افزودن مکان',
  addPlaceTitle: 'ثبت کسب‌وکار',
  addPlaceBody:
    'برای ثبت مکان یا کسب‌وکار خود در نقشه کیش، لطفاً پس از تأیید هویت و بررسی توسط تیم ما، از طریق پیام مستقیم با ادمین در ارتباط باشید.',
  addPlaceContact: 'ادمین: @Alirewa',
  buyTicket: 'خرید بلیط',
  lang: 'EN',
  darkMode: 'تاریک',
  lightMode: 'روشن',
  close: 'بستن',
} as const;

export default fa;
// Use string-valued type so both fa and en can satisfy it
export type Translations = Record<keyof typeof fa, string>;
