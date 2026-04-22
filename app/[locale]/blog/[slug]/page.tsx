import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Section from '@/components/Section';
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
          className="text-xs font-semibold uppercase tracking-[0.2em] text-terracota hover:text-terracota-dark"
        >
          ← {t('backToList')}
        </Link>
        <h1 className="heading-lg mt-6">{post.title}</h1>
        <p className="mt-3 text-sm text-ink-400">
          {t('publishedOn')} {formattedDate}
        </p>
        <article className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-terracota">
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>
      </div>
    </Section>
  );
}
