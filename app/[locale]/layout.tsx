import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getMessages, getTranslations } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocaleHtmlLang from '@/components/LocaleHtmlLang';
import { SITE } from '@/lib/site';
import { locales, type Locale } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'site' });
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${t('name')} — ${t('tagline')}`,
      template: `%s — ${t('name')}`,
    },
    description: t('description'),
    alternates: {
      canonical: `/${params.locale}/`,
      languages: {
        'pt-BR': '/pt/',
        en: '/en/',
      },
    },
    openGraph: {
      type: 'website',
      siteName: t('name'),
      title: `${t('name')} — ${t('tagline')}`,
      description: t('description'),
      url: `${SITE.url}/${params.locale}/`,
      locale: params.locale === 'en' ? 'en_US' : 'pt_BR',
      images: [{ url: '/og/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('name')} — ${t('tagline')}`,
      description: t('description'),
      images: ['/og/og-default.png'],
    },
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleHtmlLang locale={locale} />
      <div className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main key={locale} className="flex-1 locale-fade">{children}</main>
        <Footer locale={locale} />
      </div>
      {SITE.gaId ? <GoogleAnalytics gaId={SITE.gaId} /> : null}
    </NextIntlClientProvider>
  );
}
