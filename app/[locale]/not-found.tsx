import { useTranslations, useLocale } from 'next-intl';
import NotFoundHero from '@/components/NotFoundHero';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();
  const base = `/${locale}`;
  return (
    <NotFoundHero
      eyebrow={t('eyebrow')}
      statusLabel={t('status')}
      title={t('title')}
      body={t('body')}
      homeHref={`${base}/`}
      homeLabel={t('cta')}
      secondaryHref={`${base}/#services`}
      secondaryLabel={t('secondaryCta')}
      tertiaryHref={`${base}/blog/`}
      tertiaryLabel={t('blogCta')}
      illustrationLabel={t('illustrationLabel')}
    />
  );
}
