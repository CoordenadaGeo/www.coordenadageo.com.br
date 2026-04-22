import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Section from '@/components/Section';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');
  return (
    <Section tone="light">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="heading-lg">{t('title')}</h1>
        <p className="mt-4 text-lg text-ink-400">{t('body')}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracota px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracota-dark"
        >
          {t('cta')}
        </Link>
      </div>
    </Section>
  );
}
