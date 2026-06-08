import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kish Map | نقشه کیش',
  description:
    'نقشه تعاملی سه‌بعدی جزیره کیش — An interactive 3D tourism map for Kish Island, Iran',
  keywords: [
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
      <head>
        {/* Google Fonts: Inter + Playfair Display */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-screen w-screen overflow-hidden bg-zinc-950 antialiased">
        {children}
      </body>
    </html>
  );
}
