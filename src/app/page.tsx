import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingTickets from '@/components/landing/LandingTickets';
import LandingMap from '@/components/landing/LandingMap';
import LandingStats from '@/components/landing/LandingStats';

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
