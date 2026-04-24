---
title: "EPSG:900913 — uma pequena rebelião que mudou o WebGIS"
date: "2026-04-23"
excerpt: "Antes de ser padrão, a projeção mais usada da web foi uma gambiarra com nome de piada. E isso diz muito sobre como o WebGIS evoluiu."
tags: ["webgis", "projeções", "geoprocessamento", "desenvolvimento"]
---

## Uma história que começa… fora do padrão

No começo dos anos 2010, era comum abrir um banco PostGIS ou um código JavaScript de mapa e encontrar algo meio estranho:

> `SRID=900913`

Quem vinha da cartografia mais clássica estranhava imediatamente.  
Quem vinha do desenvolvimento… aceitava e seguia o jogo.

Afinal, funcionava.

Mas ali já existia uma pequena ruptura silenciosa entre dois mundos: o da **geodésia formal** e o da **web que precisava ser rápida**.

## Antes disso: o que é EPSG e por que ele manda nisso?

Para entender o incômodo, vale um pequeno desvio.

O tal do **EPSG** não é uma tecnologia — é um *registro*.  
Ele é mantido historicamente por uma organização ligada à indústria de óleo e gás (hoje sob a IOGP), que precisava padronizar sistemas de referência para operações globais.

Esse registro define códigos numéricos — os famosos **SRIDs (Spatial Reference IDs)** — que dizem, de forma inequívoca:

- qual sistema de coordenadas está sendo usado
- qual datum
- qual projeção
- quais parâmetros matemáticos

Quando você usa `EPSG:4326`, por exemplo, não está só dizendo "latitude e longitude". Está dizendo:

> "Estou usando WGS84 com todos os parâmetros definidos exatamente assim."

Isso é o que permite que:
- bancos como PostGIS funcionem corretamente
- softwares diferentes conversem entre si
- análises espaciais sejam reproduzíveis

Ou seja: **EPSG é o idioma comum da geoinformação moderna**.

E é justamente por isso que o `900913` incomodava.

## O problema: a web não quis esperar

Enquanto o mundo institucional mantinha seu ritmo — cuidadoso, técnico, baseado em consenso — a web estava acelerando.

Com a chegada do Google Maps, uma nova lógica apareceu:

- mapas deixaram de ser imagens estáticas
- passaram a ser mosaicos de tiles
- o usuário podia arrastar o mundo com o mouse

Para isso funcionar em escala global, era preciso simplificar.

A solução adotada foi uma versão "adaptada" da projeção de Mercator:

- tratada como **esfera** (não elipsoide)
- coordenadas em metros
- fórmulas simples o suficiente para rodar rápido em qualquer navegador

Do ponto de vista cartográfico, isso era… questionável.

Do ponto de vista de produto, era brilhante.

## E então veio o 900913

Como essa projeção não existia oficialmente no registro EPSG, surgiu um problema prático:

> Como salvar isso no banco?

A resposta da comunidade foi direta, quase irreverente:

> "A gente inventa um código."

Nasceu o **900913** — que, não por acaso, lê-se "GOOGLE" de cabeça para baixo.

Não foi aprovado por ninguém.  
Não passou por comitê.  
Não teve validação formal.

Mas rapidamente apareceu em todo lugar:

- bibliotecas como OpenLayers
- stacks de mapas web
- bancos espaciais
- pipelines de dados

Era uma convenção de fato.

## O incômodo (com bons motivos)

Para quem vinha da cartografia e da geodésia, aquilo não era só feio — era perigoso.

A crítica não era birra técnica, era fundamento:

- a projeção ignorava o elipsoide da Terra
- distorcia áreas de forma significativa
- não era adequada para medições
- não tinha definição formal no padrão global

Em outras palavras:

> aquilo quebrava a principal promessa do EPSG — consistência e rigor.

## A resposta do outro lado

Mas a web tinha outra métrica de sucesso.

O usuário não perguntava sobre datum.  
Ele queria:

- dar zoom sem travar
- arrastar o mapa sem delay
- ver o mundo inteiro carregando rápido

E nesse cenário, a tal projeção "errada" funcionava perfeitamente.

O que estava em jogo ali não era só uma escolha técnica — era uma mudança de paradigma:

> da precisão científica para a experiência interativa.

## Quando a prática força o padrão

Com o tempo, ignorar aquilo ficou impossível.

A projeção já era usada globalmente.  
Empresas, governos e plataformas dependiam dela.

Então veio a decisão inevitável: formalizar.

O EPSG finalmente incorporou a definição como:

> **EPSG:3857 — WGS 84 / Pseudo-Mercator**

O nome já entrega a negociação:

- "WGS 84" para manter o vínculo institucional
- "Pseudo" para admitir que não é a Mercator clássica

O `900913` desapareceu aos poucos.  
Mas deixou sua marca.

## O que essa história ensina (na prática)

Hoje, a distinção é mais clara — mas o risco continua:

- usamos 3857 para **visualização web**
- usamos sistemas projetados (UTM, por exemplo) para **análise**

Misturar esses contextos ainda gera erros comuns:
- cálculo de área em Web Mercator
- buffers distorcidos
- análises com escala inconsistente

## Onde a engenharia entra (e evita dor de cabeça)

É aqui que uma boa arquitetura de geoprocessamento faz toda a diferença.

Na **Coordenada Geo**, a regra é simples, mas levada a sério:

> **cada tarefa usa a projeção correta — e isso é transparente para quem usa a plataforma.**

Na prática, isso significa separar claramente dois mundos:

### Visualização
- **EPSG:3857 (Web Mercator)**
- otimizado para tiles, front-end e interação

### Processamento analítico (no banco)

Dependendo do problema, usamos projeções diferentes:

- **Cálculo de área**
  - UTM (SIRGAS 2000 / zonas, ex: EPSG:31982–31985 no Brasil)
  - ou projeções equivalentes adequadas à região
  - evita distorções graves de área

- **Distância e buffers locais**
  - UTM ou projeções métricas locais
  - garante que 1 km seja realmente 1 km

- **Análises em escala continental/global**
  - geodésicas sobre **EPSG:4326** (WGS84)
  - uso de funções esféricas/esferoidais (ex: `ST_DistanceSphere`, `ST_Area(geography)` no PostGIS)

- **Rotas e redes**
  - modelos baseados em grafos com métricas reais (não em Web Mercator)
  - integração com dados viários coerentes com o sistema de referência

O ponto central é:

> **EPSG:3857 nunca entra no cálculo — só na tela.**

Pode parecer detalhe, mas é exatamente esse tipo de cuidado que separa:
- um mapa "bonito"
- de um sistema que sustenta decisão técnica

## Uma última leitura possível

O episódio do 900913 não foi um acidente.

Foi um sinal de que o geoprocessamento entrou de vez no mundo do software.

E quando isso acontece, algumas coisas mudam:

- padrões passam a competir com adoção
- elegância matemática disputa espaço com performance
- e, às vezes, uma gambiarra bem feita vence uma solução perfeita

Mas, no fim, sistemas maduros fazem as pazes com os dois lados.

## Para quem quiser ir além

- Registro oficial EPSG: https://epsg.org/
- Definição do 3857: https://epsg.io/3857
- Histórico da "Spherical Mercator": https://wiki.osgeo.org/wiki/Spherical_Mercator
- Documentação do OpenLayers sobre projeções: https://openlayers.org/doc/tutorials/projections.html

---

Se você já viu um `SRID=900913` perdido em algum banco por aí,  
agora sabe: não era erro.

Era história — e um lembrete de que projeção errada no lugar errado ainda custa caro.
