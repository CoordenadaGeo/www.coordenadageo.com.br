import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const files = {};

files['messages/pt.json'] = JSON.stringify({
  site: {
    name: 'Coordenada Geo',
    tagline: 'Consultoria em geotecnologias',
    description:
      'Somos uma consultoria especializada em geotecnologias. Unimos dados geoespaciais, analise e desenvolvimento sob medida para apoiar decisoes estrategicas no territorio.',
  },
  nav: {
    about: 'Sobre',
    services: 'Servicos',
    values: 'Valores',
    platform: 'Plataforma',
    useCases: 'Casos de uso',
    blog: 'Blog',
    contact: 'Contato',
    openApp: 'Abrir plataforma',
  },
  hero: {
    eyebrow: 'Geotecnologias aplicadas',
    title: 'Transformamos dados geoespaciais em decisoes de impacto',
    subtitle:
      'Atuamos junto a empresas e instituicoes publicas com precisao tecnica, colaboracao e proposito socioambiental para mapear, analisar e comunicar o territorio.',
    primaryCta: 'Fale com a equipe',
    secondaryCta: 'Conhecer servicos',
  },
  about: {
    eyebrow: 'Quem somos',
    title: 'Consultoria de geotecnologias com foco em resultado',
    body:
      'A Coordenada Geo reune especialistas em geoprocessamento, sensoriamento remoto, analise espacial e desenvolvimento de produtos geoespaciais. Entregamos projetos end-to-end: do diagnostico a operacao, passando por modelagem de dados, automacoes e dashboards.',
    bullets: [
      'Equipe multidisciplinar com vivencia em meio ambiente, infraestrutura e setor publico.',
      'Stack moderna de dados geoespaciais (PostGIS, GDAL, Python, GEE, Mapbox).',
      'Metodo iterativo, documentado e alinhado com as melhores praticas de engenharia.'
    ]
  },
  purpose: {
    eyebrow: 'Proposito',
    title: 'Coordenar dados para orientar decisoes no territorio',
    body:
      'Acreditamos que informacao geoespacial de qualidade viabiliza politicas publicas mais justas, negocios mais eficientes e ambientes mais sustentaveis. Nosso proposito e tornar essa informacao acessivel, confiavel e util para quem decide.'
  },
  values: {
    eyebrow: 'Valores',
    title: 'Como trabalhamos',
    items: [
      {
        title: 'Precisao tecnica',
        body: 'Rigor cientifico na escolha de metodos, bases de dados e validacoes, sem abrir mao da clareza.'
      },
      {
        title: 'Colaboracao',
        body: 'Construimos solucoes lado a lado com clientes e parceiros, integrando conhecimento tecnico e de dominio.'
      },
      {
        title: 'Adaptabilidade',
        body: 'Ajustamos escopo, ferramentas e entregaveis a realidade de cada projeto e escala de operacao.'
      },
      {
        title: 'Proposito socioambiental',
        body: 'Priorizamos iniciativas que geram impacto positivo em pessoas, territorios e ecossistemas.'
      }
    ]
  },
  services: {
    eyebrow: 'Servicos',
    title: 'O que entregamos',
    items: [
      {
        title: 'Diagnostico e modelagem geoespacial',
        body: 'Estruturacao de bases cartograficas, modelagem de dados e definicao de indicadores territoriais.'
      },
      {
        title: 'Analise e sensoriamento remoto',
        body: 'Estudos de uso e cobertura do solo, monitoramento ambiental e analises espaciais avancadas.'
      },
      {
        title: 'Dashboards e visualizacao',
        body: 'Painel web e mapas interativos para acompanhar indicadores, areas de interesse e series temporais.'
      },
      {
        title: 'Automacao e pipelines de dados',
        body: 'ETL geoespacial, integracao com APIs publicas e orquestracao de coleta, processamento e publicacao.'
      },
      {
        title: 'Plataformas sob medida',
        body: 'Desenvolvimento de aplicacoes web e APIs geoespaciais, do prototipo a operacao em producao.'
      },
      {
        title: 'Capacitacao e suporte tecnico',
        body: 'Treinamentos, code reviews e acompanhamento de equipes internas que trabalham com dados geograficos.'
      }
    ]
  },
  platform: {
    eyebrow: 'Plataforma proprietaria',
    title: 'Uma base tecnologica que acelera nossos projetos',
    body:
      'Desenvolvemos e mantemos uma plataforma geoespacial propria que serve como base para boa parte das entregas: catalogo de camadas, automacoes, APIs e visualizacao interativa. Clientes recebem acesso dedicado conforme o escopo contratado.',
    cta: 'Abrir plataforma'
  },
  useCases: {
    eyebrow: 'Casos de uso',
    title: 'Onde atuamos',
    items: [
      {
        title: 'Meio ambiente e clima',
        body: 'Monitoramento de cobertura vegetal, areas protegidas, risco climatico e passivo ambiental.'
      },
      {
        title: 'Infraestrutura e logistica',
        body: 'Planejamento de rotas, analise de redes, avaliacao de ativos e impacto no territorio.'
      },
      {
        title: 'Setor publico e politicas territoriais',
        body: 'Subsidios para planejamento urbano, regularizacao fundiaria e monitoramento de programas.'
      },
      {
        title: 'Agro e uso do solo',
        body: 'Caracterizacao de propriedades, aptidao agricola e dinamica de uso e ocupacao do solo.'
      }
    ]
  },
  blog: {
    eyebrow: 'Conteudo',
    title: 'Do nosso radar',
    readMore: 'Ler artigo',
    all: 'Ver todos os artigos',
    empty: 'Em breve publicaremos nossos primeiros artigos.'
  },
  contact: {
    eyebrow: 'Contato',
    title: 'Vamos conversar sobre o seu desafio geoespacial',
    body:
      'Conte o contexto do projeto, objetivos e prazos. Respondemos com uma proposta inicial de abordagem em poucos dias uteis.',
    emailCta: 'Enviar e-mail',
    whatsappCta: 'Abrir conversa'
  },
  footer: {
    tagline:
      'Consultoria em geotecnologias. Estruturamos dados, analises e plataformas para decisoes melhores no territorio.',
    product: 'Solucoes',
    connect: 'Conecte-se',
    rights: 'Todos os direitos reservados.'
  },
  notFound: {
    title: 'Pagina nao encontrada',
    body: 'O conteudo que voce procura pode ter sido movido ou ainda nao existe.',
    cta: 'Voltar para a home'
  }
}, null, 2) + '\n';

files['messages/en.json'] = JSON.stringify({
  site: {
    name: 'Coordenada Geo',
    tagline: 'Geospatial technology consultancy',
    description:
      'We are a consultancy specialised in geospatial technologies. We combine geospatial data, analysis and tailor-made development to support strategic decisions across the territory.'
  },
  nav: {
    about: 'About',
    services: 'Services',
    values: 'Values',
    platform: 'Platform',
    useCases: 'Use cases',
    blog: 'Blog',
    contact: 'Contact',
    openApp: 'Open platform'
  },
  hero: {
    eyebrow: 'Applied geospatial tech',
    title: 'We turn geospatial data into high-impact decisions',
    subtitle:
      'We work with companies and public institutions with technical precision, collaboration and social-environmental purpose to map, analyse and communicate the territory.',
    primaryCta: 'Talk to the team',
    secondaryCta: 'Explore services'
  },
  about: {
    eyebrow: 'Who we are',
    title: 'A geospatial consultancy focused on outcomes',
    body:
      'Coordenada Geo brings together specialists in GIS, remote sensing, spatial analysis and geospatial product development. We deliver end-to-end projects: from assessment to operation, including data modelling, automation and dashboards.',
    bullets: [
      'Multidisciplinary team with experience in environment, infrastructure and public sector.',
      'Modern geospatial data stack (PostGIS, GDAL, Python, GEE, Mapbox).',
      'Iterative, well-documented method aligned with engineering best practices.'
    ]
  },
  purpose: {
    eyebrow: 'Purpose',
    title: 'Coordinate data to guide decisions on the territory',
    body:
      'We believe high-quality geospatial information enables fairer public policies, more efficient businesses and more sustainable environments. Our purpose is to make that information accessible, reliable and useful for decision-makers.'
  },
  values: {
    eyebrow: 'Values',
    title: 'How we work',
    items: [
      {
        title: 'Technical precision',
        body: 'Scientific rigour in choosing methods, datasets and validations, without sacrificing clarity.'
      },
      {
        title: 'Collaboration',
        body: 'We co-build solutions with clients and partners, integrating technical and domain expertise.'
      },
      {
        title: 'Adaptability',
        body: 'We adjust scope, tools and deliverables to the reality of each project and operational scale.'
      },
      {
        title: 'Social-environmental purpose',
        body: 'We prioritise initiatives that generate positive impact on people, territories and ecosystems.'
      }
    ]
  },
  services: {
    eyebrow: 'Services',
    title: 'What we deliver',
    items: [
      {
        title: 'Geospatial assessment and modelling',
        body: 'Cartographic base structuring, data modelling and definition of territorial indicators.'
      },
      {
        title: 'Analysis and remote sensing',
        body: 'Land use and land cover studies, environmental monitoring and advanced spatial analysis.'
      },
      {
        title: 'Dashboards and visualisation',
        body: 'Web panels and interactive maps to follow indicators, areas of interest and time series.'
      },
      {
        title: 'Automation and data pipelines',
        body: 'Geospatial ETL, integration with public APIs and orchestration of collection, processing and publishing.'
      },
      {
        title: 'Custom platforms',
        body: 'Development of geospatial web applications and APIs, from prototype to production.'
      },
      {
        title: 'Training and technical support',
        body: 'Training, code reviews and mentoring for internal teams working with geographic data.'
      }
    ]
  },
  platform: {
    eyebrow: 'In-house platform',
    title: 'A technological base that accelerates our projects',
    body:
      'We develop and maintain an in-house geospatial platform that underpins most of our deliveries: layer catalogue, automations, APIs and interactive visualisation. Clients receive dedicated access according to the agreed scope.',
    cta: 'Open platform'
  },
  useCases: {
    eyebrow: 'Use cases',
    title: 'Where we work',
    items: [
      {
        title: 'Environment and climate',
        body: 'Monitoring of vegetation cover, protected areas, climate risk and environmental liabilities.'
      },
      {
        title: 'Infrastructure and logistics',
        body: 'Route planning, network analysis, asset evaluation and territorial impact.'
      },
      {
        title: 'Public sector and territorial policy',
        body: 'Inputs for urban planning, land regularisation and programme monitoring.'
      },
      {
        title: 'Agriculture and land use',
        body: 'Property characterisation, agricultural suitability and land use and occupation dynamics.'
      }
    ]
  },
  blog: {
    eyebrow: 'Content',
    title: 'From our radar',
    readMore: 'Read article',
    all: 'See all articles',
    empty: 'We will publish our first articles soon.'
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about your geospatial challenge",
    body:
      'Share the project context, goals and timeline. We reply with an initial approach within a few business days.',
    emailCta: 'Send email',
    whatsappCta: 'Open chat'
  },
  footer: {
    tagline:
      'Geospatial technology consultancy. We structure data, analysis and platforms for better decisions on the territory.',
    product: 'Solutions',
    connect: 'Connect',
    rights: 'All rights reserved.'
  },
  notFound: {
    title: 'Page not found',
    body: 'The content you are looking for may have been moved or does not exist yet.',
    cta: 'Back to home'
  }
}, null, 2) + '\n';

files['app/[locale]/layout.tsx'] = `import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocaleHtmlLang from '@/components/LocaleHtmlLang';
import { SITE } from '@/lib/site';
import { locales, type Locale } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'site' });
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: \`\${t('name')} — \${t('tagline')}\`,
      template: \`%s — \${t('name')}\`,
    },
    description: t('description'),
    alternates: {
      canonical: \`/\${params.locale}/\`,
      languages: {
        'pt-BR': '/pt/',
        en: '/en/',
      },
    },
    openGraph: {
      type: 'website',
      siteName: t('name'),
      title: \`\${t('name')} — \${t('tagline')}\`,
      description: t('description'),
      url: \`\${SITE.url}/\${params.locale}/\`,
      locale: params.locale === 'en' ? 'en_US' : 'pt_BR',
      images: [{ url: '/og/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: \`\${t('name')} — \${t('tagline')}\`,
      description: t('description'),
      images: ['/og/og-default.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleHtmlLang locale={locale} />
      <div className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
      {SITE.gaId ? <GoogleAnalytics gaId={SITE.gaId} /> : null}
    </NextIntlClientProvider>
  );
}
`;

files['app/[locale]/page.tsx'] = `import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Compass,
  Satellite,
  LayoutDashboard,
  Workflow,
  AppWindow,
  GraduationCap,
  Leaf,
  TrafficCone,
  Landmark,
  Sprout,
  Target,
  Handshake,
  Shuffle,
  HeartHandshake,
} from 'lucide-react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { SITE } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';
import type { Locale } from '@/i18n';

const serviceIcons = [Compass, Satellite, LayoutDashboard, Workflow, AppWindow, GraduationCap];
const useCaseIcons = [Leaf, TrafficCone, Landmark, Sprout];
const valueIcons = [Target, Handshake, Shuffle, HeartHandshake];

type Dict = Record<string, any>;

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const t = (await getTranslations({ locale })) as unknown as (k: string) => string;
  const tr = await getTranslations({ locale });
  const values = (await getTranslations({ locale }))('values') as unknown as Dict;
  // next-intl does not expose raw objects here; load messages directly.
  const messages = (await import(\`@/messages/\${locale}.json\`)).default as Dict;

  const posts = await getAllPosts(locale);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand-light">
        <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow">{messages.hero.eyebrow}</p>
            <h1 className="heading-xl mt-3">{messages.hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-400">{messages.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={\`#contact\`} variant="primary">
                {messages.hero.primaryCta} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={\`#services\`} variant="secondary">
                {messages.hero.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" tone="light">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">{messages.about.eyebrow}</p>
            <h2 className="heading-lg mt-3">{messages.about.title}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg text-ink-400">{messages.about.body}</p>
            <ul className="mt-6 space-y-3 text-ink-700">
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

      {/* Purpose */}
      <Section tone="moss">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{messages.purpose.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.purpose.title}</h2>
          <p className="mt-5 text-lg text-ink-400">{messages.purpose.body}</p>
        </div>
      </Section>

      {/* Values */}
      <Section id="values" tone="light">
        <div className="max-w-2xl">
          <p className="eyebrow">{messages.values.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.values.title}</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {messages.values.items.map((v: { title: string; body: string }, i: number) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <Card key={v.title} title={v.title} body={v.body} icon={<Icon className="h-5 w-5" />} />
            );
          })}
        </div>
      </Section>

      {/* Services */}
      <Section id="services" tone="sand">
        <div className="max-w-2xl">
          <p className="eyebrow">{messages.services.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.services.title}</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {messages.services.items.map((s: { title: string; body: string }, i: number) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <Card key={s.title} title={s.title} body={s.body} icon={<Icon className="h-5 w-5" />} />
            );
          })}
        </div>
      </Section>

      {/* Platform */}
      <Section id="platform" tone="ink">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">{messages.platform.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {messages.platform.title}
            </h2>
            <p className="mt-5 text-lg text-ink-100">{messages.platform.body}</p>
            <div className="mt-8">
              <Button href={SITE.appUrl} variant="onDark" external>
                {messages.platform.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <dl className="grid grid-cols-2 gap-5 text-white">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ocre">PostGIS</dt>
                  <dd className="mt-1 text-sm text-ink-100">Banco geoespacial</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ocre">APIs</dt>
                  <dd className="mt-1 text-sm text-ink-100">REST / OGC</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ocre">Mapbox</dt>
                  <dd className="mt-1 text-sm text-ink-100">Visualizacao</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ocre">Python</dt>
                  <dd className="mt-1 text-sm text-ink-100">Pipelines</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Use cases */}
      <Section id="use-cases" tone="light">
        <div className="max-w-2xl">
          <p className="eyebrow">{messages.useCases.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.useCases.title}</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {messages.useCases.items.map((u: { title: string; body: string }, i: number) => {
            const Icon = useCaseIcons[i % useCaseIcons.length];
            return (
              <Card key={u.title} title={u.title} body={u.body} icon={<Icon className="h-5 w-5" />} />
            );
          })}
        </div>
      </Section>

      {/* Latest posts */}
      <Section tone="sand">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">{messages.blog.eyebrow}</p>
            <h2 className="heading-lg mt-3">{messages.blog.title}</h2>
          </div>
          <Link
            href={\`/\${locale}/blog/\`}
            className="text-sm font-semibold text-terracota hover:text-terracota-dark"
          >
            {messages.blog.all} <span aria-hidden>&rarr;</span>
          </Link>
        </div>
        {latestPosts.length === 0 ? (
          <p className="mt-8 text-ink-400">{messages.blog.empty}</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((p) => (
              <Link
                key={p.slug}
                href={\`/\${locale}/blog/\${p.slug}/\`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <time className="text-xs uppercase tracking-widest text-terracota">
                  {new Date(p.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR')}
                </time>
                <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="text-sm text-ink-400">{p.description}</p>
                <span className="mt-auto text-sm font-semibold text-terracota">
                  {messages.blog.readMore} &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>

      {/* Contact */}
      <Section id="contact" tone="light">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{messages.contact.eyebrow}</p>
          <h2 className="heading-lg mt-3">{messages.contact.title}</h2>
          <p className="mt-5 text-lg text-ink-400">{messages.contact.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={\`mailto:\${SITE.contact.email}\`} variant="primary">
              <Mail className="h-4 w-4" /> {messages.contact.emailCta}
            </Button>
            <Button
              href={\`https://wa.me/\${SITE.contact.whatsapp}\`}
              variant="secondary"
              external
            >
              <MessageCircle className="h-4 w-4" /> {messages.contact.whatsappCta}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
`;

for (const [p, content] of Object.entries(files)) {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content, 'utf8');
  console.log('wrote', p);
}
