import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n';

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  date: string;
  cover?: string;
  tags?: string[];
};

export type Post = PostMeta & { content: string };

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

function readDir(locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

function readFile(locale: Locale, file: string): Post {
  const full = path.join(CONTENT_DIR, locale, file);
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  const slug = file.replace(/\.(md|mdx)$/, '');
  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ''),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    cover: data.cover ? String(data.cover) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    content,
  };
}

export function getPosts(locale: Locale): PostMeta[] {
  return readDir(locale)
    .map((file) => {
      const p = readFile(locale, file);
      const { content: _c, ...meta } = p;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(locale: Locale, slug: string): Post | null {
  const files = readDir(locale);
  const file = files.find((f) => f.replace(/\.(md|mdx)$/, '') === slug);
  if (!file) return null;
  return readFile(locale, file);
}

export function getAllPostSlugs(): Array<{ locale: Locale; slug: string }> {
  const out: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of ['pt', 'en'] as const) {
    for (const f of readDir(locale)) {
      out.push({ locale, slug: f.replace(/\.(md|mdx)$/, '') });
    }
  }
  return out;
}
