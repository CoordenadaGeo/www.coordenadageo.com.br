import clsx from 'clsx';
import type { ReactNode } from 'react';

export default function Section({
  id,
  className,
  children,
  tone = 'light',
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: 'light' | 'sand' | 'moss' | 'ink';
}) {
  const tones = {
    light: 'bg-white text-ink-700 dark:bg-ink dark:text-sand-light',
    sand: 'bg-sand-light text-ink-700 dark:bg-ink-700 dark:text-sand-light',
    moss: 'bg-moss-50 text-ink-700 dark:bg-moss-800 dark:text-sand-light',
    ink: 'bg-ink text-white dark:bg-ink-900 dark:text-sand-light',
  } as const;
  return (
    <section
      id={id}
      className={clsx('py-12 sm:py-16 lg:py-24 transition-colors duration-300', tones[tone], className)}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}
