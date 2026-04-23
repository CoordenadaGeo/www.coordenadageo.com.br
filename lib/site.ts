export const SITE = {
  name: 'Coordenada Geo',
  url: 'https://coordenadageo.com.br',
  appUrl: 'https://coordenada.geo.br',
  /**
   * Set to `true` once the SaaS platform is publicly available.
   * While `false`, all "Open platform" CTAs route to the internal
   * /<locale>/em-breve/ page instead of appUrl.
   */
  appAvailable: false,
  defaultLocale: 'pt' as const,
  locales: ['pt', 'en'] as const,
  contact: {
    email: 'contato@coordenadageo.com.br',
    // E.164, only digits for wa.me
    whatsapp: '5548984076841',
    whatsappDisplay: '+55 (48) 98407-6841',
    city: 'Florianópolis-SC, Brasil',
    linkedin: 'https://www.linkedin.com/company/coordenadageo',
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
};

export type Locale = (typeof SITE.locales)[number];

/**
 * Returns the correct href for the "Open platform" CTA based on
 * whether the SaaS is publicly available. While it is not, the CTA
 * points to the internal coming-soon page preserving the current locale.
 */
export function getAppHref(locale: Locale | string): string {
  return SITE.appAvailable ? SITE.appUrl : `/${locale}/em-breve/`;
}

/** Whether the "Open platform" link should open in a new tab. */
export function isAppExternal(): boolean {
  return SITE.appAvailable;
}
