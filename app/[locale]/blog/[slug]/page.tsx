import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Section from '@/components/Section';
import { mdxComponents } from '@/components/MDXComponents';
import { getAllPostSlugs, getPost } from '@/lib/blog';
import type { Locale } from '@/i18n';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const post = getPost(locale, slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'pt' ? 'pt-BR' : 'en-US',
    { day: '2-digit', month: 'long', year: 'numeric' },
  );

  return (
    <Section tone="light">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/${locale}/blog/`}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-terracota hover:text-terracota-dark dark:text-ocre dark:hover:text-ocre-300"
        >
          ← {t('backToList')}
        </Link>
        <header className="mt-8 border-b border-ink/10 pb-8 dark:border-sand-light/10">
          {post.tags && post.tags.length > 0 ? (
            <ul className="mb-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-sand-light px-3 py-1 text-xs font-medium text-ink-700 dark:bg-ink-700 dark:text-sand-light"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}
          <h1 className="heading-lg">{post.title}</h1>
          {post.excerpt ? (
            <p className="mt-5 text-lg leading-relaxed text-ink-400 dark:text-sand-light/80">
              {post.excerpt}
            </p>
          ) : null}
          <p className="mt-6 text-sm text-ink-400 dark:text-sand-light/60">
            {t('publishedOn')} {formattedDate}
          </p>
        </header>
        <article className="mt-4">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>
      </div>
    </Section>
  );
}
