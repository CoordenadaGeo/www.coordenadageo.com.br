'use client';

import { useEffect } from 'react';

// Root layout is rendered with lang="pt-BR" for static export. On locale routes
// we update document.documentElement.lang client-side so assistive tech and
// browsers reflect the active locale.
export default function LocaleHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale === 'en' ? 'en' : 'pt-BR';
    }
  }, [locale]);
  return null;
}
