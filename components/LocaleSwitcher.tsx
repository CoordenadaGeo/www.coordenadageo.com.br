'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n';

export default function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? '/';
  const router = useRouter();

  function pathForLocale(target: string) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return `/${target}/`;
    parts[0] = target;
    return `/${parts.join('/')}/`;
  }

  const index = locales.indexOf(current);

  return (
    <div
      role="radiogroup"
      aria-label="Idioma / Language"
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/80 py-1 pl-2 pr-1 text-xs font-semibold uppercase tracking-widest shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
    >
      <Globe aria-hidden className="h-3.5 w-3.5 text-ink/60 dark:text-sand-light/60" />
      <div className="relative flex items-center">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-9 rounded-full bg-terracota transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${index * 100}%)` }}
        />
        {locales.map((l) => {
          const isActive = l === current;
          return (
            <Link
              key={l}
              role="radio"
              aria-checked={isActive}
              href={pathForLocale(l)}
              onClick={(e) => {
                e.preventDefault();
                router.push(pathForLocale(l));
              }}
              className={`relative z-10 w-9 rounded-full py-1 text-center transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-ink/70 hover:text-ink dark:text-sand-light/80 dark:hover:text-sand-light'
              }`}
            >
              {l.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
