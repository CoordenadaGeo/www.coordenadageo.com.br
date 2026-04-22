# Deploy + DNS checklist (coordenadageo.com.br)

## 1) Pipeline de deploy

### Pre-requisitos

- Repositorio no GitHub com branch `main`.
- GitHub Pages habilitado em `Settings -> Pages`:
  - Source: `Deploy from a branch`
  - Branch: `main`
  - Folder: `/docs`
- Arquivo `public/CNAME` com o dominio final:

```txt
coordenadageo.com.br
```

### Workflows

- CI: `.github/workflows/ci.yml`
  - Dispara em PR e push na `main`.
  - Valida `npm ci`, `npm run lint`, `npm run build`.
- Deploy: `.github/workflows/deploy.yml`
  - Dispara em push na `main`.
  - Gera build estatico (`out/`) e sincroniza para `docs/`.
  - Commita mudancas de `docs/` com `[skip ci]`.

### Sequencia de release

1. Abrir PR para `main`.
2. Aguardar CI verde.
3. Fazer merge na `main`.
4. Confirmar sucesso do deploy workflow.
5. Confirmar site publicado no Pages.

## 2) Checklist DNS (Registro.br + GitHub Pages)

### Registros esperados

No apex (`@`):

```txt
A 185.199.108.153
A 185.199.109.153
A 185.199.110.153
A 185.199.111.153
```

No host `www`:

```txt
CNAME <usuario>.github.io.
```

### GitHub Pages

1. Em `Settings -> Pages`, definir `Custom domain` como `coordenadageo.com.br`.
2. Salvar e aguardar validacao DNS.
3. Habilitar `Enforce HTTPS` quando disponivel.

## 3) Verificacao tecnica de DNS

No terminal WSL/Linux:

```bash
dig +short A coordenadageo.com.br
dig +short CNAME www.coordenadageo.com.br
```

No Windows PowerShell (alternativa):

```powershell
Resolve-DnsName coordenadageo.com.br -Type A
Resolve-DnsName www.coordenadageo.com.br -Type CNAME
```

Resultado esperado:

- Apex retorna os 4 IPs do GitHub Pages.
- `www` retorna CNAME para `<usuario>.github.io`.

## 4) Smoke test pos-deploy

- [ ] https://coordenadageo.com.br abre com HTTPS valido.
- [ ] https://www.coordenadageo.com.br responde corretamente (redireciona ou serve).
- [ ] https://coordenadageo.com.br/pt/ abre.
- [ ] https://coordenadageo.com.br/en/ abre.
- [ ] https://coordenadageo.com.br/sitemap.xml abre.
- [ ] https://coordenadageo.com.br/robots.txt abre.
- [ ] (Opcional) GA4 recebendo eventos em tempo real.

## 5) Troubleshooting rapido

- `404` apos deploy:
  - Verificar se `docs/` foi atualizado no ultimo commit.
  - Verificar se Pages aponta para `main /docs`.
- Dominio sem HTTPS:
  - Confirmar `Custom domain` salvo no GitHub.
  - Aguardar propagacao DNS e emissao do certificado.
- `www` nao resolve:
  - Revisar CNAME de `www` no Registro.br.
- Build falha no CI:
  - Rodar localmente `npm ci && npm run lint && npm run build`.
