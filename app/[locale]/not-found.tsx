import { useTranslations, useLocale } from 'next-intl';
import NotFoundHero from '@/components/NotFoundHero';
import { SITE } from '@/lib/site';

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
      secondaryHref={`${base}/#about`}
      secondaryLabel={t('secondaryCta')}
      tertiaryHref={SITE.blogEnabled ? `${base}/blog/` : undefined}
      tertiaryLabel={SITE.blogEnabled ? t('blogCta') : undefined}
      illustrationLabel={t('illustrationLabel')}
    />
  );
}
