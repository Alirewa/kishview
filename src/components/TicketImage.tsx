'use client';
import { useState } from 'react';
import { Ticket } from 'lucide-react';
import { assetUrl } from '@/lib/assetUrl';

interface Props {
  src?: string | null;
  alt: string;
  className?: string;
  iconClassName?: string;
}

export function TicketImage({ src, alt, className, iconClassName = 'w-14 h-14 text-sky-400' }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Ticket className={iconClassName} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetUrl(src)}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
