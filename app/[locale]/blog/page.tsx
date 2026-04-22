import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Section from '@/components/Section';
import { getPosts } from '@/lib/blog';
import type { Locale } from '@/i18n';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = (await import(`@/messages/${locale}.json`)).default.blog;
  return { title: t.title, description: t.subtitle };
}

export default function BlogIndex({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const posts = getPosts(locale);
  return <BlogList locale={locale} posts={posts} />;
}

function BlogList({
  locale,
  posts,
}: {
  locale: Locale;
  posts: ReturnType<typeof getPosts>;
}) {
  const t = useTranslations('blog');
  return (
    <Section tone="light">
      <div className="max-w-2xl">
        <span className="eyebrow">{t('title')}</span>
        <h1 className="heading-lg mt-3">{t('title')}</h1>
        <p className="mt-4 text-lg text-ink-400">{t('subtitle')}</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <p className="text-ink-400">{t('empty')}</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}/`}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <time className="text-xs font-semibold uppercase tracking-widest text-terracota">
                {new Date(post.date).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
              <h2 className="font-display text-xl font-bold text-ink group-hover:text-terracota">
                {post.title}
              </h2>
              <p className="text-sm text-ink-400">{post.excerpt}</p>
            </Link>
          ))
        )}
      </div>
    </Section>
  );
}
