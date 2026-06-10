'use client';
import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">تماس با ما</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">سوال یا پیشنهادی دارید؟ با ما در تماس باشید.</p>

      {sent ? (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">پیام شما ارسال شد</h2>
          <p className="text-zinc-500 dark:text-zinc-400">به زودی با شما تماس خواهیم گرفت.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">نام</label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">ایمیل</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">پیام</label>
            <textarea
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
              rows={5}
              className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-5 h-5" />
            ارسال پیام
          </button>
        </form>
      )}
    </div>
  );
}
