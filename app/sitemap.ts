import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { locales } from '@/i18n';
import { getPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${SITE.url}/${locale}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE.url}/${l}/`])),
      },
    });
    entries.push({
      url: `${SITE.url}/${locale}/blog/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
    for (const post of getPosts(locale)) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${post.slug}/`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
