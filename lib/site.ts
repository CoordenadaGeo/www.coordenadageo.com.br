export const SITE = {
  name: 'Coordenada Geo',
  url: 'https://coordenadageo.com.br',
  appUrl: 'https://coordenada.geo.br',
  defaultLocale: 'pt' as const,
  locales: ['pt', 'en'] as const,
  // TODO: replace placeholders with real contact data before going public
  contact: {
    email: 'contato@coordenadageo.com.br',
    // E.164, only digits for wa.me
    whatsapp: '5548984076841',
    whatsappDisplay: '+55 (48) 98407-6841',
    city: 'Florianópolis-SC, Brasil',
    linkedin: 'https://www.linkedin.com/company/coordenadageo',
    // instagram: 'https://www.instagram.com/coordenadageo',
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
};

export type Locale = (typeof SITE.locales)[number];
