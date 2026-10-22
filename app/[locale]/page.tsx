import Link from 'next/link';
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Map,
  BarChart3,
  Table2,
  BookOpen,
  Share2,
  FileUp,
  Microscope,
  Presentation,
  FolderOpen,
  Shuffle,
  SlidersHorizontal,
  Compass,
  Building2,
  Leaf,
  HeartPulse,
  Target,
  Handshake,
  HeartHandshake,
} from 'lucide-react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { SITE, getAppHref, isAppExternal } from '@/lib/site';
import { getPosts, type PostMeta } from '@/lib/blog';
import type { Locale } from '@/i18n';

const problemIcons = [Microscope, Presentation, Share2];
const stepIcons = [FolderOpen, SlidersHorizontal, Share2];
const serviceIcons = [Map, BarChart3, Table2, BookOpen, Share2, FileUp];
const useCaseIcons = [Compass, Building2, Leaf, HeartPulse];
const valueIcons = [Target, Handshake, Shuffle, HeartHandshake];

type Messages = typeof import('@/messages/pt.json');

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const messages = (await import(`@/messages/${locale}.json`)).default as Messages;
  const posts = getPosts(locale).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand-light dark:bg-ink-800 transition-colors duration-300">
        <div className="container-x grid gap-10 py-14 sm:py-20 lg:min-h-[22rem] lg:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">{messages.hero.eyebrow}</p>
            <h1 className="heading-xl mt-3">{messages.hero.title}</h1>
            <p className="mt-5 text-lg text-ink-400 dark:text-sand-light/90">{messages.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={getAppHref(locale)} variant="primary" external={isAppExternal()}>
                {messages.hero.primaryCta} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#platform" variant="secondary">
                {messages.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-5 text-sm text-ink-400 dark:text-sand-light/70">{messages.hero.note}</p>
          </div>
        </div>
      </section>

      {/* Value (do dado ao impacto) */}
      <Section id="problem" tone="light">
        <div className="max-w-3xl">
          <p className="eyebrow">{messages.problem.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.problem.title}</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {messages.problem.items.map((it: { title: string; body: string }, i: number) => {
            const Icon = problemIcons[i % problemIcons.length];
            return <Card key={it.title} title={it.title} body={it.body} icon={<Icon className="h-5 w-5" />} />;
          })}
        </div>
        <p className="mt-10 max-w-3xl font-display text-xl font-bold text-ink dark:text-sand-light">
          {messages.problem.closing}
        </p>
      </Section>

      {/* Platform (Plataforma -> Como funciona) */}
      <Section id="platform" tone="ink">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">{messages.platform.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {messages.platform.title}
            </h2>
            <p className="mt-5 text-lg text-ink-100">{messages.platform.body}</p>
            <div className="mt-8">
              <Button href={getAppHref(locale)} variant="onDark" external={isAppExternal()}>
                {messages.platform.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ol className="space-y-4">
              {messages.platform.steps.map((st: { title: string; body: string }, i: number) => {
                const Icon = stepIcons[i % stepIcons.length];
                return (
                  <li key={st.title} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocre/20 text-ocre">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold">
                        {i + 1}. {st.title}
                      </p>
                      <p className="mt-1 text-sm text-ink-100">{st.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Section>

      {/* Benefits (Plataforma -> Benefícios) */}
      <Section id="services" tone="sand">
        <div className="max-w-2xl">
          <p className="eyebrow">{messages.services.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.services.title}</h2>
          {messages.services.intro ? (
            <p className="mt-4 text-lg text-ink-400 dark:text-sand-light/90">{messages.services.intro}</p>
          ) : null}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {messages.services.items.map((s: { title: string; body: string }, i: number) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return <Card key={s.title} title={s.title} body={s.body} icon={<Icon className="h-5 w-5" />} />;
          })}
        </div>
      </Section>

      {/* Use cases (Plataforma -> Para quem) */}
      <Section id="use-cases" tone="light">
        <div className="max-w-2xl">
          <p className="eyebrow">{messages.useCases.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.useCases.title}</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {messages.useCases.items.map((u: { title: string; body: string }, i: number) => {
            const Icon = useCaseIcons[i % useCaseIcons.length];
            return <Card key={u.title} title={u.title} body={u.body} icon={<Icon className="h-5 w-5" />} />;
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="sand">
        <div className="max-w-2xl">
          <p className="eyebrow">{messages.faq.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.faq.title}</h2>
        </div>
        <div className="mt-10 max-w-3xl space-y-3">
          {messages.faq.items.map((q: { q: string; a: string }) => (
            <details
              key={q.q}
              className="group rounded-2xl border border-ink/10 bg-white p-5 dark:border-white/15 dark:bg-white/[0.06]"
            >
              <summary className="cursor-pointer list-none font-display text-lg font-bold text-ink dark:text-sand-light">
                {q.q}
              </summary>
              <p className="mt-3 text-ink-400 dark:text-sand-light/90">{q.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Purpose (Sobre -> Propósito) */}
      <Section id="purpose" tone="moss">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{messages.purpose.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.purpose.title}</h2>
          <p className="mt-5 text-lg text-ink-400 dark:text-sand-light/90">{messages.purpose.body}</p>
        </div>
      </Section>

      {/* About (Sobre -> Quem somos) */}
      <Section id="about" tone="light">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">{messages.about.eyebrow}</p>
            <h2 className="heading-lg mt-3">{messages.about.title}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg text-ink-400 dark:text-sand-light/90">{messages.about.body}</p>
            <ul className="mt-6 space-y-3 text-ink-700 dark:text-sand-light/90">
              {messages.about.bullets.map((b: string) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracota" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Values (Sobre -> Valores) */}
      <Section id="values" tone="sand">
        <div className="max-w-2xl">
          <p className="eyebrow">{messages.values.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.values.title}</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {messages.values.items.map((v: { title: string; body: string }, i: number) => {
            const Icon = valueIcons[i % valueIcons.length];
            return <Card key={v.title} title={v.title} body={v.body} icon={<Icon className="h-5 w-5" />} />;
          })}
        </div>
      </Section>

      {/* Latest posts (Conteúdo) */}
      <Section tone="light">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">{messages.blog.eyebrow}</p>
            <h2 className="heading-lg mt-3">{messages.blog.title}</h2>
          </div>
          <Link
            href={`/${locale}/blog/`}
            className="text-sm font-semibold text-terracota hover:text-terracota-dark dark:text-ocre dark:hover:text-ocre-300"
          >
            {messages.blog.all} <span aria-hidden>&rarr;</span>
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="mt-8 text-ink-400 dark:text-sand-light/80">{messages.blog.empty}</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p: PostMeta) => (
              <Link
                key={p.slug}
                href={`/${locale}/blog/${p.slug}/`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
              >
                <time className="text-xs uppercase tracking-widest text-terracota dark:text-ocre">
                  {new Date(p.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR')}
                </time>
                <h3 className="font-display text-lg font-bold text-ink dark:text-sand-light">{p.title}</h3>
                <p className="text-sm text-ink-400 dark:text-sand-light/80">{p.excerpt}</p>
                <span className="mt-auto text-sm font-semibold text-terracota dark:text-ocre">
                  {messages.blog.readMore} &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>

      {/* Contact */}
      <Section id="contact" tone="sand">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{messages.contact.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.contact.title}</h2>
          <p className="mt-5 text-lg text-ink-400 dark:text-sand-light/90">{messages.contact.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={`mailto:${SITE.contact.email}`} variant="primary">
              <Mail className="h-4 w-4" /> {messages.contact.emailCta}
            </Button>
            <Button href={`https://wa.me/${SITE.contact.whatsapp}`} variant="secondary" external>
              <MessageCircle className="h-4 w-4" /> {messages.contact.whatsappCta}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
