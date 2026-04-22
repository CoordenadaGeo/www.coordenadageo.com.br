# www.coordenadageo.com.br

Site institucional da **Coordenada Geo** — consultoria em geotecnologias. Publicado no domínio
[coordenadageo.com.br](https://coordenadageo.com.br) via GitHub Pages.

> O app SaaS da Coordenada Geo vive em outro repositório e no domínio
> [coordenada.geo.br](https://coordenada.geo.br). Este repositório é apenas o site institucional.

## Stack

- **Next.js 14** (App Router, `output: 'export'` — SSG puro)
- **TypeScript** + **Tailwind CSS**
- **next-intl** (PT-BR e EN, `/pt` como padrão)
- **next-mdx-remote** + `gray-matter` para o blog em Markdown
- **@next/third-parties/google** para GA4 opcional

Fontes da identidade visual: **Comfortaa** (display) + **Urbanist** (texto), via `next/font`.

Paleta baseada no Manual de Marca (`static/Manual de Marca _ Coordenada Geo.pdf`). Ver
[runbooks/brand-notes.md](runbooks/brand-notes.md) para um resumo dos extratos utilizados.

## Rodando localmente

```bash
npm install
npm run dev
# abra http://localhost:3000
```

Para gerar a versão estática:

```bash
npm run build      # gera ./out
npx serve out      # serve o build local para validar
```

## Estrutura

```
app/
  [locale]/
    layout.tsx       # chrome (Header/Footer/i18n/GA)
    page.tsx         # home (Hero, Sobre, Propósito, Valores, Serviços, Plataforma, Atuação, Novidades, Contato)
    blog/
      page.tsx       # listagem de posts
      [slug]/page.tsx
    not-found.tsx
  layout.tsx         # html shell + fontes
  page.tsx           # redirect cliente para /pt/
  robots.ts
  sitemap.ts
components/          # Header, Footer, Logo, Button, Card, Section, LocaleSwitcher
content/blog/
  pt/*.md
  en/*.md
lib/
  blog.ts            # leitura dos posts em build time
  site.ts            # URLs e dados de contato
messages/
  pt.json
  en.json
public/
  brand/             # logos oficiais
  og/                # imagem OpenGraph
  CNAME              # coordenadageo.com.br
  .nojekyll          # desabilita Jekyll no GitHub Pages
static/              # material fonte da marca (PDF, PNGs originais)
```

## Adicionando um post de blog

1. Crie um arquivo em `content/blog/pt/` e `content/blog/en/` com frontmatter:
   ```md
   ---
   title: "Título do post"
   date: "2026-05-01"
   excerpt: "Resumo de uma frase."
   tags: ["estudo-de-caso"]
   ---

   Conteúdo em Markdown/MDX…
   ```
2. Commit e push. O CI rebuilda o site automaticamente.

## Alterar textos do site

Tudo que é UI está em `messages/pt.json` e `messages/en.json`. Mantenha as chaves idênticas nos
dois arquivos.

## Trocar imagens

Logos principais em `public/brand/*`. Imagem OpenGraph em `public/og/og-default.png` (ideal: 1200×630).

## Contato e redes (placeholders)

Edite `lib/site.ts` para colocar e-mail real, WhatsApp (E.164 em `whatsapp`, formatação humana em
`whatsappDisplay`), cidade, LinkedIn, Instagram. Os links de `mailto:` e `wa.me/` consomem esses
valores em toda a UI.

## Google Analytics 4

- Crie a propriedade GA4 e copie o `G-XXXXXXXXXX`.
- No GitHub: **Settings → Secrets and variables → Actions → Variables** crie
  `NEXT_PUBLIC_GA_ID` com o valor.
- No próximo build o script é injetado. Sem essa variável, o site sobe sem tracking.

## Deploy (GitHub Pages via GitHub Actions)

Fluxo do pipeline:

- **CI (`.github/workflows/ci.yml`)**: roda lint + build em PRs para `main`.
- **Deploy (`.github/workflows/deploy.yml`)**: em cada push em `main`, gera `out/` e publica no
  GitHub Pages via `actions/upload-pages-artifact` + `actions/deploy-pages` (sem commits extras).

1. **Criar o repositório no GitHub** (primeira vez):
   ```bash
   git init -b main
   git add .
   git commit -m "chore: initial institutional site"
   git remote add origin git@github.com:<usuario>/www.coordenadageo.com.br.git
   git push -u origin main
   ```

2. **Habilitar Pages**: Settings → Pages → Build and deployment → Source: **GitHub Actions**.

3. **Configurar DNS** no Registro.br (zona `coordenadageo.com.br`):
   - Registros `A` para o apex:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Registro `CNAME` para `www` → `<usuario>.github.io.`

4. **Domínio custom no GitHub**: Settings → Pages → Custom domain: `coordenadageo.com.br` → Save.
   Aguarde a verificação do DNS e marque **Enforce HTTPS** (Let's Encrypt é provisionado
   automaticamente). O arquivo `public/CNAME` já está comitado no repositório.

Checklist operacional completo:

- Veja `runbooks/deploy-dns-checklist.md` para o passo a passo de deploy + verificação de DNS.

## Checklist pós-deploy

- [ ] `https://coordenadageo.com.br` carrega com cadeado válido.
- [ ] `https://www.coordenadageo.com.br` redireciona para o apex (ou aceita — GitHub trata).
- [ ] `/pt/` e `/en/` funcionando.
- [ ] `/sitemap.xml` e `/robots.txt` acessíveis.
- [ ] GA4 (se habilitado) recebendo eventos.
- [ ] Dados de contato em `lib/site.ts` trocados para os valores reais.

## Licenças

- Marca gráfica, Manual de Marca e fotografias: propriedade da Coordenada Geo. Ver
  `static/Manual de Marca _ Coordenada Geo.pdf` para diretrizes de uso.
- Código-fonte deste site: MIT (ou outra licença que você preferir — ajuste antes de tornar o
  repositório público).
