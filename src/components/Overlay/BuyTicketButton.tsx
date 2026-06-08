'use client';

interface Props {
  url: string;
  label: string;
}

export function BuyTicketButton({ url, label }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2
                 w-full min-h-[48px] rounded-2xl
                 bg-gradient-to-r from-orange-500 to-amber-400
                 hover:from-orange-600 hover:to-amber-500
                 text-white font-semibold text-sm
                 shadow-lg shadow-orange-500/30
                 hover:shadow-xl hover:shadow-orange-500/40
                 hover:scale-[1.02] active:scale-[0.98]
                 transition-all duration-200 cursor-pointer"
    >
      {label}
    </a>
  );
}
