import Link from 'next/link';
import clsx from 'clsx';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocre';

const variants: Record<Variant, string> = {
  primary:
    'bg-terracota text-white hover:bg-terracota-dark dark:bg-terracota-light dark:hover:bg-terracota',
  secondary:
    'bg-white text-ink ring-1 ring-inset ring-ink/15 hover:bg-sand-light dark:bg-white/5 dark:text-sand-light dark:ring-white/15 dark:hover:bg-white/10',
  ghost:
    'text-ink hover:text-terracota dark:text-sand-light dark:hover:text-ocre',
  onDark: 'bg-white text-ink hover:bg-sand-light',
};

type Props = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
};

export default function Button({ href, variant = 'primary', className, children, external }: Props) {
  const classes = clsx(base, variants[variant], className);
  if (external || /^(https?:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={/^https?:/.test(href) ? '_blank' : undefined}
        rel={/^https?:/.test(href) ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
