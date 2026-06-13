import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'کیش ویو | KishView', template: '%s | کیش ویو' },
  description: 'نقشه تعاملی سه‌بعدی، خرید بلیت تفریحات و راهنمای گردشگری جزیره کیش',
  keywords: ['kishview', 'kish island', 'kish map', 'جزیره کیش', 'نقشه کیش', 'خرید بلیت کیش'],
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'کیش ویو' },
  icons: { apple: '/icons/icon-192.png' },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#09090b' }],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function fontFace(weight: number, file: string) {
  return `@font-face{font-family:'Vazirmatn';src:url('${BASE}/fonts/${file}')format('woff2');font-weight:${weight};font-style:normal;font-display:swap;}`;
}

const VAZIRMATN_CSS = [
  fontFace(100, 'Vazirmatn-RD-FD-Thin.woff2'),
  fontFace(200, 'Vazirmatn-RD-FD-ExtraLight.woff2'),
  fontFace(300, 'Vazirmatn-RD-FD-Light.woff2'),
  fontFace(400, 'Vazirmatn-RD-FD-Regular.woff2'),
  fontFace(500, 'Vazirmatn-RD-FD-Medium.woff2'),
  fontFace(600, 'Vazirmatn-RD-FD-SemiBold.woff2'),
  fontFace(700, 'Vazirmatn-RD-FD-Bold.woff2'),
  fontFace(800, 'Vazirmatn-RD-FD-ExtraBold.woff2'),
  fontFace(900, 'Vazirmatn-RD-FD-Black.woff2'),
].join('');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: VAZIRMATN_CSS }} />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        {children}
      </body>
    </html>
  );
}
