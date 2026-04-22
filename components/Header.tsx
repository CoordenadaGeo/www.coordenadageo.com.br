import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logo from './Logo';
import Button from './Button';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeToggle from './ThemeToggle';
import { DesktopNav, MobileNav, type NavGroup } from './NavMenu';
import { SITE } from '@/lib/site';
import type { Locale } from '@/i18n';

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const base = `/${locale}`;

  const groups: NavGroup[] = [
    {
      label: t('about.label'),
      items: [
        { label: t('about.items.who'), href: `${base}/#about` },
        { label: t('about.items.purpose'), href: `${base}/#purpose` },
        { label: t('about.items.values'), href: `${base}/#values` },
      ],
    },
    {
      label: t('services.label'),
      items: [
        { label: t('services.items.offer'), href: `${base}/#services` },
        { label: t('services.items.platform'), href: `${base}/#platform` },
        { label: t('services.items.useCases'), href: `${base}/#use-cases` },
      ],
    },
    { label: t('content'), href: `${base}/blog/` },
    { label: t('contact'), href: `${base}/#contact` },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur dark:border-white/15 dark:bg-ink/90">
      <div className="container-x flex h-20 items-center justify-between gap-4 lg:h-24">
        <Link href={`${base}/`} className="flex shrink-0 items-center" aria-label="Coordenada Geo">
          <Logo variant="horizontal" className="h-11 w-auto lg:h-14 dark:hidden" priority />
          <Logo variant="horiz-branco" className="hidden h-11 w-auto lg:h-14 dark:block" priority />
        </Link>
        <DesktopNav groups={groups} />
        <div className="flex items-center gap-2">
          <LocaleSwitcher current={locale} />
          <ThemeToggle label={t('toggleTheme')} />
          <Button href={SITE.appUrl} variant="primary" external className="hidden w-48 justify-center sm:inline-flex">
            {t('openApp')}
          </Button>
          <MobileNav groups={groups} ctaHref={SITE.appUrl} ctaLabel={t('openApp')} />
        </div>
      </div>
    </header>
  );
}
