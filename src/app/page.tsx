import type { Metadata } from 'next';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import LandingHero from '@/components/landing/LandingHero';
import LandingStats from '@/components/landing/LandingStats';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingTickets from '@/components/landing/LandingTickets';
import LandingMap from '@/components/landing/LandingMap';

export const metadata: Metadata = {
  title: 'کیش ویو | KishView — نقشه، بلیت و راهنمای جزیره کیش',
  description:
    'راهنمای جامع سفر به جزیره آزاد کیش: نقشه تعاملی سه‌بعدی، خرید آنلاین بلیت پارک دلفین، آکواریوم، باغ پرندگان و بیشتر. بدون ویزا تا ۱۴ روز برای اتباع خارجی.',
  keywords: [
    'کیش', 'جزیره کیش', 'نقشه کیش', 'بلیت کیش', 'پارک دلفین کیش',
    'آکواریوم کیش', 'تور کیش', 'Kish Island', 'Kish map', 'Kish tickets',
    'Kish Dolphin Park', 'Kish Aquarium', 'Iran free zone',
  ],
  openGraph: {
    title: 'کیش ویو — راهنمای هوشمند جزیره کیش',
    description: 'نقشه تعاملی، خرید بلیت آنلاین و راهنمای کامل جزیره آزاد کیش',
    type: 'website',
    locale: 'fa_IR',
    alternateLocale: 'en_US',
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />
      <main>
        <LandingHero />
        <LandingStats />
        <LandingFeatures />
        <LandingTickets />
        <LandingMap />
      </main>
      <SiteFooter />
    </div>
  );
}
