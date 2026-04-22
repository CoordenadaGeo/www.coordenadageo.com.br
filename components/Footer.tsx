import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logo from './Logo';
import { SITE } from '@/lib/site';
import type { Locale } from '@/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-ink text-white dark:bg-ink-900">
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
              <Link href={`${base}/#services`} className="hover:text-white">
                {t('nav.services.label')}
              </Link>
            </li>
            <li>
              <Link href={`${base}/#platform`} className="hover:text-white">
                {t('nav.services.items.platform')}
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
              <a href={`mailto:${SITE.contact.email}`} className="hover:text-white">
                {SITE.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.contact.whatsapp}`}
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
