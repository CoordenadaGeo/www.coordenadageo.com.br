import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ComingSoon, { type ComingSoonStatusItem } from '@/components/ComingSoon';
import { SITE } from '@/lib/site';
import { locales, type Locale } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Messages = typeof import('@/messages/pt.json');

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'comingSoon.platform' });
  const site = await getTranslations({ locale: params.locale, namespace: 'site' });
  return {
    title: `${t('title')} — ${site('name')}`,
    description: t('body'),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${params.locale}/em-breve/`,
      languages: {
        'pt-BR': '/pt/em-breve/',
        en: '/en/em-breve/',
      },
    },
  };
}

export default async function ComingSoonPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const messages = (await import(`@/messages/${locale}.json`)).default as Messages;
  const m = messages.comingSoon.platform;

  const steps: ComingSoonStatusItem[] = m.steps.map((s) => ({
    label: s.label,
    state: s.state as ComingSoonStatusItem['state'],
  }));

  return (
    <ComingSoon
      eyebrow={m.eyebrow}
      statusLabel={m.status}
      title={m.title}
      body={m.body}
      eta={m.eta}
      steps={steps}
      homeHref={`/${locale}/`}
      homeLabel={m.homeCta}
      contactHeading={m.contactHeading}
      email={SITE.contact.email}
      emailLabel={m.emailCta}
      whatsapp={SITE.contact.whatsapp}
      whatsappLabel={m.whatsappCta}
    />
  );
}
