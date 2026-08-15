---
title: "TerraMind: o modelo de fundação da IBM e da ESA para observação da Terra"
date: "2026-08-12"
excerpt: "A IBM e a ESA treinaram um modelo multimodal que reconstrói o tipo de dado geoespacial ausente numa cena a partir dos demais — e publicaram os resultados no benchmark PANGAEA."
tags: ["sensoriamento-remoto", "foundation-models", "observacao-da-terra", "geoprocessamento"]
---

## O problema: cobertura combinada nem sempre existe

Uma análise geoespacial completa costuma exigir mais de um tipo de dado sobre a mesma
área e data — óptico, radar, elevação, uso do solo. Cada um vem de um sensor diferente, com
órbita e frequência de revisita próprias, e é comum que nem todos estejam disponíveis para
o mesmo recorte espaço-temporal: uma cena óptica pode estar coberta de nuvem justamente na
data em que a passagem SAR foi feita, ou uma camada de uso do solo pode não ter cobertura
atualizada para a região. Isso obriga cada tipo de dado a ser tratado por um modelo
treinado especificamente para ele, com pouca integração entre eles.

Em abril de 2025, a IBM e a Agência Espacial Europeia (ESA) publicaram o TerraMind,
um modelo de fundação treinado simultaneamente sobre nove tipos de dado geoespacial —
entre eles óptico e multiespectral do Sentinel-2, radar de abertura sintética do
Sentinel-1, elevação e uso e cobertura do solo — usando o TerraMesh, um conjunto de 9
milhões de amostras alinhadas espaço-temporalmente em escala global. O ponto técnico que
sustenta este post é a forma como o modelo lida com a ausência de um desses tipos de dado
para uma cena específica.

## Thinking-in-Modalities: reconstruir o dado ausente como etapa intermediária

O mecanismo se chama Thinking-in-Modalities (TiM). A analogia que a IBM usa na
documentação do modelo: assim como um modelo de linguagem pode gerar um passo de
raciocínio intermediário antes de responder, o TerraMind pode gerar uma camada de dado
geoespacial sintética — por exemplo, uso e cobertura do solo — como etapa intermediária,
mesmo quando essa camada não fazia parte da entrada original.

> Quando falta um tipo de dado para a cena, o modelo reconstrói uma aproximação dele a
> partir dos demais tipos disponíveis e segue com a tarefa.

Isso é possível porque a arquitetura combina duas escalas de representação — pixel, para
nuance espacial fina, e token, para contexto — num encoder-decoder transformer simétrico,
treinado com reconstrução mascarada entre os diferentes tipos de dado. No benchmark
comunitário PANGAEA, referência para comparar modelos de fundação em observação da Terra,
a IBM reporta que o TerraMind superou doze modelos concorrentes em 8% ou mais em tarefas
de classificação de cobertura do solo, detecção de mudanças e análise multi-sensorial —
resultado do próprio paper, aceito no ICCV 2025, e restrito a esse benchmark, sem valer
como veredito geral sobre o estado da arte da área.

## O que muda para quem monta pipeline de sensoriamento remoto

TerraMind é um modelo de base, não um produto de auditoria: CAR, embargo e alerta de
desmatamento continuam exigindo lógica e fontes próprias. O que ele reduz é o custo de
gerar uma representação intermediária a partir do dado bruto disponível, mesmo quando a
combinação de sensores para aquela área e data está incompleta — situação recorrente em
pipeline geoespacial sobre território real. Modelo e tokenizers estão publicados
abertamente no GitHub e no Hugging Face, permitindo fine-tuning direto em vez de treinar
um modelo de visão computacional do zero para cada nova tarefa.

## Para quem quiser ir além

- Anúncio oficial da IBM Research: https://research.ibm.com/blog/terramind-esa-earth-observation-model
- Anúncio da ESA: https://www.esa.int/Applications/Observing_the_Earth/ESA_and_IBM_collaborate_on_TerraMind
- Paper (pré-print, arXiv:2504.11171): https://arxiv.org/abs/2504.11171
- Publicação IBM Research (ICCV 2025): https://research.ibm.com/publications/terramind-large-scale-generative-multimodality-for-earth-observation
- Repositório e código: https://github.com/IBM/terramind
- Modelos no Hugging Face: https://huggingface.co/ibm-esa-geospatial/TerraMind-1.0-large

---

Modelo de fundação bom é o que some no pipeline — e deixa a análise aparecer.
