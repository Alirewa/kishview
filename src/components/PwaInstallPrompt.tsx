'use client';
import { useEffect, useState } from 'react';
import { X, Smartphone } from 'lucide-react';

export function PwaInstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow]     = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('pwa-dismissed')) return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPrompt(e);
      setTimeout(() => setShow(true), 4000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!show || !prompt) return null;

  function install() {
    prompt!.prompt();
    prompt!.userChoice.then(() => setShow(false));
  }
  function dismiss() {
    localStorage.setItem('pwa-dismissed', '1');
    setShow(false);
  }

  return (
    <div
      dir="rtl"
      className="fixed bottom-24 left-4 right-4 z-50 max-w-sm mx-auto
                 bg-white dark:bg-zinc-900 rounded-2xl
                 shadow-2xl shadow-black/20
                 border border-zinc-100 dark:border-zinc-800
                 flex items-center gap-3 p-4
                 animate-slide-up"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-300/40">
        <Smartphone className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">کیش ویو را نصب کنید</p>
        <p className="text-xs text-zinc-400 mt-0.5">دسترسی سریع‌تر، بدون مرورگر</p>
      </div>
      <button
        onClick={install}
        className="flex-shrink-0 px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-colors cursor-pointer"
      >
        نصب
      </button>
      <button
        onClick={dismiss}
        className="flex-shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
        aria-label="بستن"
      >
        <X size={15} />
      </button>
    </div>
  );
}
