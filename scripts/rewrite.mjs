// Rewrite all files that ended up duplicated due to UNC path caching.
// This is a one-shot repair script.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const files = {
  'components/Button.tsx': `import Link from 'next/link';
import clsx from 'clsx';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocre';

const variants: Record<Variant, string> = {
  primary: 'bg-terracota text-white hover:bg-terracota-dark',
  secondary: 'bg-white text-ink ring-1 ring-inset ring-ink/15 hover:bg-sand-light',
  ghost: 'text-ink hover:text-terracota',
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
`,

  'components/Section.tsx': `import clsx from 'clsx';
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
    light: 'bg-white text-ink-700',
    sand: 'bg-sand-light text-ink-700',
    moss: 'bg-moss-50 text-ink-700',
    ink: 'bg-ink text-white',
  } as const;
  return (
    <section
      id={id}
      className={clsx('py-16 sm:py-20 lg:py-24', tones[tone], className)}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}
`,

  'components/Card.tsx': `import clsx from 'clsx';
import type { ReactNode } from 'react';

export default function Card({
  title,
  body,
  icon,
  className,
  tone = 'light',
}: {
  title: string;
  body: string;
  icon?: ReactNode;
  className?: string;
  tone?: 'light' | 'onDark';
}) {
  return (
    <div
      className={clsx(
        'flex h-full flex-col gap-3 rounded-2xl p-6 shadow-sm transition hover:shadow-md',
        tone === 'light'
          ? 'border border-ink/10 bg-white'
          : 'border border-white/10 bg-white/5',
        className,
      )}
    >
      {icon ? (
        <div
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            tone === 'light' ? 'bg-ocre/15 text-terracota' : 'bg-ocre/20 text-ocre',
          )}
        >
          {icon}
        </div>
      ) : null}
      <h3
        className={clsx(
          'font-display text-lg font-bold',
          tone === 'light' ? 'text-ink' : 'text-white',
        )}
      >
        {title}
      </h3>
      <p className={clsx('text-sm leading-relaxed', tone === 'light' ? 'text-ink-400' : 'text-ink-100')}>
        {body}
      </p>
    </div>
  );
}
`,

  'components/LocaleSwitcher.tsx': `'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

export default function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? '/';

  function pathForLocale(target: string) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return \`/\${target}/\`;
    parts[0] = target;
    return \`/\${parts.join('/')}/\`;
  }

  return (
    <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink/30">/</span>}
          <Link
            href={pathForLocale(l)}
            aria-current={l === current ? 'true' : undefined}
            className={l === current ? 'text-terracota' : 'text-ink hover:text-terracota'}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
`,

  'components/Header.tsx': `import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logo from './Logo';
import Button from './Button';
import LocaleSwitcher from './LocaleSwitcher';
import { SITE } from '@/lib/site';
import type { Locale } from '@/i18n';

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const base = \`/\${locale}\`;
  const items = [
    { href: \`\${base}/#about\`, label: t('about') },
    { href: \`\${base}/#services\`, label: t('services') },
    { href: \`\${base}/#values\`, label: t('values') },
    { href: \`\${base}/#platform\`, label: t('platform') },
    { href: \`\${base}/#use-cases\`, label: t('useCases') },
    { href: \`\${base}/blog/\`, label: t('blog') },
    { href: \`\${base}/#contact\`, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href={\`\${base}/\`} className="flex items-center" aria-label="Coordenada Geo">
          <Logo variant="horizontal" className="h-9 w-auto" priority />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition hover:text-terracota"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher current={locale} />
          <Button href={SITE.appUrl} variant="primary" external className="hidden sm:inline-flex">
            {t('openApp')}
          </Button>
        </div>
      </div>
    </header>
  );
}
`,

  'components/Footer.tsx': `import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logo from './Logo';
import { SITE } from '@/lib/site';
import type { Locale } from '@/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const base = \`/\${locale}\`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-ink text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Logo variant="horiz-branco" className="h-10 w-auto" />
          <p className="max-w-sm text-sm text-ink-100">{t('footer.tagline')}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ocre">
            {t('footer.product')}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-100">
            <li>
              <Link href={\`\${base}/#services\`} className="hover:text-white">
                {t('nav.services')}
              </Link>
            </li>
            <li>
              <Link href={\`\${base}/#platform\`} className="hover:text-white">
                {t('nav.platform')}
              </Link>
            </li>
            <li>
              <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {t('nav.openApp')}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ocre">
            {t('footer.connect')}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-100">
            <li>
              <a href={\`mailto:\${SITE.contact.email}\`} className="hover:text-white">
                {SITE.contact.email}
              </a>
            </li>
            <li>
              <a
                href={\`https://wa.me/\${SITE.contact.whatsapp}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={SITE.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SITE.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-xs text-ink-100 md:flex-row md:items-center">
          <span>
            © {year} Coordenada Geo. {t('footer.rights')}
          </span>
          <span>coordenadageo.com.br</span>
        </div>
      </div>
    </footer>
  );
}
`,

  'app/layout.tsx': `import type { Metadata } from 'next';
import { Comfortaa, Urbanist } from 'next/font/google';
import './globals.css';

// Tipografia oficial do Manual de Marca: Comfortaa (principal) + Urbanist (apoio).
const display = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const sans = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Coordenada Geo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={\`\${sans.variable} \${display.variable}\`}>
      <body className="min-h-screen bg-white font-sans text-ink-700">{children}</body>
    </html>
  );
}
`,

  'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
  --color-ink: #012034;
  --color-moss: #698461;
  --color-ocre: #D99856;
  --color-terracota: #B03E19;
  --color-sand: #E5DBC0;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-ink-700 antialiased;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
}

@layer components {
  .container-x {
    @apply mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8;
  }

  .heading-xl {
    @apply font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl;
  }

  .heading-lg {
    @apply font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl;
  }

  .heading-md {
    @apply font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl;
  }

  .eyebrow {
    @apply font-sans text-xs font-semibold uppercase tracking-[0.2em] text-terracota;
  }
}
`,

  'tailwind.config.ts': `import type { Config } from 'tailwindcss';

// Paleta oficial do Manual de Marca (Coordenada Geo).
// Fonte: static/Manual de Marca _ Coordenada Geo.pdf, pagina 21.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#012034',
          50: '#E6EBEF',
          100: '#BFCCD5',
          200: '#8FA5B3',
          300: '#5E7E92',
          400: '#2E5671',
          500: '#012034',
          600: '#011A2A',
          700: '#011521',
          800: '#000F18',
          900: '#00070C',
        },
        moss: {
          DEFAULT: '#698461',
          50: '#EFF3ED',
          100: '#D4DED1',
          200: '#AFC0AA',
          300: '#89A282',
          400: '#698461',
          500: '#577053',
          600: '#465A43',
          700: '#354334',
          800: '#242D24',
          900: '#141814',
        },
        ocre: {
          DEFAULT: '#D99856',
          50: '#FBF2E7',
          100: '#F4DDBE',
          200: '#EAC08D',
          300: '#E0AA6F',
          400: '#D99856',
          500: '#C07E3A',
          600: '#9A6530',
          700: '#744C25',
          800: '#4F331A',
          900: '#29190D',
        },
        terracota: {
          DEFAULT: '#B03E19',
          light: '#D4633E',
          dark: '#8A2F11',
        },
        sand: {
          DEFAULT: '#E5DBC0',
          light: '#F2EBDA',
          dark: '#C9BA94',
        },
        graphite: '#1D1D1D',
        mist: '#AFAFAF',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [],
};

export default config;
`,
};

for (const [p, content] of Object.entries(files)) {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content, 'utf8');
  console.log('wrote', p);
}
