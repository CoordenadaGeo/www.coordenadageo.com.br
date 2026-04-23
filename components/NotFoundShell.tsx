'use client';

import { useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotFoundHero from '@/components/NotFoundHero';
import LocaleHtmlLang from '@/components/LocaleHtmlLang';
import ptMessages from '@/messages/pt.json';
import enMessages from '@/messages/en.json';
import type { Locale } from '@/i18n';

const messagesByLocale: Record<Locale, typeof ptMessages> = {
  pt: ptMessages,
  en: enMessages,
};

function detectLocaleFromPath(): Locale | null {
  if (typeof window === 'undefined') return null;
  const first = window.location.pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  if (first === 'en') return 'en';
  if (first === 'pt') return 'pt';
  return null;
}

function detectLocaleFromNavigator(): Locale {
  if (typeof navigator === 'undefined') return 'pt';
  const candidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean);
  for (const lang of candidates) {
    const short = lang.toLowerCase().slice(0, 2);
    if (short === 'en') return 'en';
    if (short === 'pt') return 'pt';
  }
  return 'pt';
}

function detectLocale(): Locale {
  // URL path wins: GitHub Pages serves the same 404.html regardless of the
  // requested path, so a visitor on /en/anything should still see English.
  return detectLocaleFromPath() ?? detectLocaleFromNavigator();
}

export default function NotFoundShell() {
  // Render pt on the server to match the static HTML, then swap on the client
  // if the user's browser prefers a different supported locale.
  const [locale, setLocale] = useState<Locale>('pt');

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const messages = messagesByLocale[locale];
  const t = messages.notFound;
  const base = `/${locale}`;

  return (
    <NextIntlClientProvider locale={locale} messages={messages as never}>
      <LocaleHtmlLang locale={locale} />
      <div className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main className="flex-1">
          <NotFoundHero
            eyebrow={t.eyebrow}
            statusLabel={t.status}
            title={t.title}
            body={t.body}
            homeHref={`${base}/`}
            homeLabel={t.cta}
            secondaryHref={`${base}/#services`}
            secondaryLabel={t.secondaryCta}
            tertiaryHref={`${base}/blog/`}
            tertiaryLabel={t.blogCta}
            illustrationLabel={t.illustrationLabel}
          />
        </main>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
