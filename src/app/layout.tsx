import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KishView | نقشه تعاملی کیش',
  description:
    'نقشه تعاملی سه‌بعدی جزیره کیش — KishView: Interactive 3D tourism map for Kish Island, Iran',
  keywords: [
    'kishview',
    'kish island',
    'kish map',
    'جزیره کیش',
    'نقشه کیش',
    'tourism',
    'iran',
    'interactive map',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <head />
      <body className="h-screen w-screen overflow-hidden bg-zinc-950 antialiased">
        {children}
      </body>
    </html>
  );
}
