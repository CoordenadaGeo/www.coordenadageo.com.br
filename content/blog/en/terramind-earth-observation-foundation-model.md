---
title: "TerraMind: IBM and ESA's foundation model for Earth observation"
date: "2026-08-12"
excerpt: "IBM and ESA trained a multimodal model that reconstructs a missing geospatial data type in a scene from the ones that are available — and published results on the PANGAEA benchmark."
tags: ["remote-sensing", "foundation-models", "earth-observation", "geoprocessing"]
---

## The problem: combined coverage isn't always available

A complete geospatial analysis usually needs more than one data type over the same area
and date — optical, radar, elevation, land cover. Each comes from a different sensor, with
its own orbit and revisit frequency, and it's common for not all of them to be available
for the same spatio-temporal window: an optical scene can be cloud-covered exactly on the
date a SAR pass was made, or a land cover layer may lack an up-to-date pass for the
region. That forces each data type to be handled by a model trained specifically for it,
with little integration between them.

On April 22, 2025, IBM and the European Space Agency (ESA) published TerraMind, a
foundation model trained simultaneously across nine geospatial data types — including
optical and multispectral Sentinel-2 data, Sentinel-1 synthetic aperture radar, elevation,
and land use/land cover — using TerraMesh, a globally distributed, spatiotemporally
aligned dataset of 9 million samples. The technical point this post is built on is how the
model handles the absence of one of these data types for a given scene.

## Thinking-in-Modalities: reconstructing missing data as an intermediate step

The mechanism is called Thinking-in-Modalities (TiM). IBM's own analogy in the model
documentation: just as a language model can generate an intermediate reasoning step before
answering, TerraMind can generate a synthetic geospatial data layer — land cover, for
instance — as an intermediate step, even when that layer wasn't part of the original
input.

> When a data type is missing for the scene, the model reconstructs an approximation of
> it from the other available data types and carries on with the task.

That's possible because the architecture combines two levels of representation — pixel,
for fine spatial nuance, and token, for context — inside a symmetric transformer
encoder-decoder trained with cross-modal masked reconstruction. On the PANGAEA community
benchmark, the reference for comparing Earth observation foundation models, IBM reports
that TerraMind outperformed twelve competing models by 8% or more on land cover
classification, change detection, and multi-sensor analysis tasks — a result from the
paper itself, accepted at ICCV 2025, and worth reading as a benchmark-specific figure, not
as a general verdict on the field's state of the art.

## What changes for remote sensing pipelines

TerraMind is a base model, not an audit product: land registry checks, embargoes, and
deforestation alerts still require their own logic and sources. What it reduces is the
cost of producing an intermediate representation from the raw data that's actually
available, even when the sensor combination for that area and date is incomplete — a
recurring situation in any geospatial pipeline running over real-world territory. The
model and its tokenizers are released openly on GitHub and Hugging Face, allowing direct
fine-tuning instead of training a computer vision model from scratch for every new task.

## Going further

- IBM Research announcement: https://research.ibm.com/blog/terramind-esa-earth-observation-model
- ESA announcement: https://www.esa.int/Applications/Observing_the_Earth/ESA_and_IBM_collaborate_on_TerraMind
- Preprint (arXiv:2504.11171): https://arxiv.org/abs/2504.11171
- IBM Research publication (ICCV 2025): https://research.ibm.com/publications/terramind-large-scale-generative-multimodality-for-earth-observation
- Code repository: https://github.com/IBM/terramind
- Models on Hugging Face: https://huggingface.co/ibm-esa-geospatial/TerraMind-1.0-large

---

A good foundation model is the one that disappears into the pipeline — and lets the
analysis show through.
