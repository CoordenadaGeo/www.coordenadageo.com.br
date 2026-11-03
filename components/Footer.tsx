import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logo from './Logo';
import FooterMap from './FooterMap';
import { SITE, getAppHref, isAppExternal } from '@/lib/site';
import type { Locale } from '@/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const base = `/${locale}`;
  const year = new Date().getFullYear();
  const appHref = getAppHref(locale);
  const appExternal = isAppExternal();

  return (
    <footer className="mt-8 bg-ink text-white dark:bg-ink-900">
      {/* Faixa de mapa: de ponta a ponta, dissolvida no fundo do rodapé */}
      <div className="relative h-[28rem] overflow-hidden md:h-96">
        <FooterMap label={t('footer.mapLabel')} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent dark:from-ink-900" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent dark:from-ink-900" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent dark:from-ink-900/90 dark:via-ink-900/50 md:block" />
        <div className="container-x pointer-events-none relative flex h-full items-end pb-8 md:items-center md:pb-0">
          <div className="max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocre">{t('footer.location')}</p>
            <p className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">Florianópolis</p>
            <p className="mt-1 text-sm text-ink-100">{t('footer.city')}</p>
            <p className="mt-4 text-xs tabular-nums tracking-[0.15em] text-ocre/80">27°35′43″S · 48°32′53″W</p>
          </div>
        </div>
      </div>
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
              <Link href={`${base}/#solutions`} className="hover:text-white">
                {t('nav.services.items.offer')}
              </Link>
            </li>
            <li>
              <Link href={`${base}/#platform`} className="hover:text-white">
                {t('nav.services.items.platform')}
              </Link>
            </li>
            <li>
              <a
                href={appHref}
                target={appExternal ? '_blank' : undefined}
                rel={appExternal ? 'noopener noreferrer' : undefined}
                className="hover:text-white"
              >
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
                {SITE.contact.email.split('@')[0]}@<wbr />
                {SITE.contact.email.split('@')[1]}
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
