---
title: "EPSG:900913 — a small rebellion that changed WebGIS"
date: "2026-04-23"
excerpt: "Before it became a standard, the web's most-used projection was a hack with a punchline for a name. And that says a lot about how WebGIS evolved."
tags: ["webgis", "projections", "geoprocessing", "development"]
---

## A story that starts… off-standard

In the early 2010s, it was common to open a PostGIS database or some map-related JavaScript and find something slightly odd:

> `SRID=900913`

Anyone coming from classic cartography would raise an eyebrow immediately.  
Anyone coming from software development… would just roll with it.

After all, it worked.

But there was already a quiet rift between two worlds: **formal geodesy** and **the web that had to be fast**.

## First things first: what is EPSG and why does it rule this space?

To understand the discomfort, a short detour helps.

**EPSG** is not a technology — it is a *registry*.  
It has been historically maintained by an organization tied to the oil and gas industry (today under IOGP), which needed to standardize reference systems for global operations.

This registry defines numeric codes — the famous **SRIDs (Spatial Reference IDs)** — that unambiguously state:

- which coordinate system is being used
- which datum
- which projection
- which mathematical parameters

When you use `EPSG:4326`, for example, you're not just saying "latitude and longitude." You're saying:

> "I'm using WGS84 with all parameters defined exactly like this."

That's what allows:
- databases like PostGIS to work correctly
- different software to talk to each other
- spatial analyses to be reproducible

In short: **EPSG is the common language of modern geoinformation**.

And that's exactly why `900913` was uncomfortable.

## The problem: the web wasn't going to wait

While the institutional world kept its pace — careful, technical, consensus-based — the web was speeding up.

With Google Maps, a new logic appeared:

- maps were no longer static images
- they became mosaics of tiles
- users could drag the world around with a mouse

For this to work at a global scale, things had to be simplified.

The adopted solution was an "adapted" version of the Mercator projection:

- treated as a **sphere** (not an ellipsoid)
- coordinates in meters
- formulas simple enough to run fast in any browser

From a cartographic standpoint, this was… questionable.

From a product standpoint, it was brilliant.

## And then came 900913

Since this projection didn't officially exist in the EPSG registry, a practical problem showed up:

> How do you store this in a database?

The community's answer was direct, almost irreverent:

> "We'll just invent a code."

Thus was born **900913** — which, not by accident, reads "GOOGLE" upside down.

It wasn't approved by anyone.  
It didn't go through a committee.  
It had no formal validation.

But it quickly showed up everywhere:

- libraries like OpenLayers
- web mapping stacks
- spatial databases
- data pipelines

It was a de facto convention.

## The discomfort (for good reasons)

For those coming from cartography and geodesy, this wasn't just ugly — it was dangerous.

The criticism wasn't technical stubbornness, it was foundational:

- the projection ignored the Earth's ellipsoid
- it significantly distorted areas
- it wasn't suitable for measurement
- it had no formal definition in the global standard

In other words:

> it broke EPSG's main promise — consistency and rigor.

## The response from the other side

But the web had a different metric for success.

The user wasn't asking about datums.  
They wanted:

- to zoom without stutter
- to pan the map without lag
- to see the whole world load fast

And in that scenario, the "wrong" projection worked perfectly.

What was really at stake wasn't only a technical choice — it was a paradigm shift:

> from scientific precision to interactive experience.

## When practice forces the standard

Over time, ignoring it became impossible.

The projection was already being used globally.  
Companies, governments and platforms depended on it.

So came the inevitable decision: formalize it.

EPSG finally incorporated the definition as:

> **EPSG:3857 — WGS 84 / Pseudo-Mercator**

The name itself reveals the negotiation:

- "WGS 84" to keep the institutional link
- "Pseudo" to acknowledge it isn't classic Mercator

`900913` slowly disappeared.  
But it left its mark.

## What this story teaches (in practice)

Today the distinction is clearer — but the risk remains:

- we use 3857 for **web visualization**
- we use projected systems (like UTM) for **analysis**

Mixing these contexts still produces common errors:
- area calculation in Web Mercator
- distorted buffers
- analyses with inconsistent scale

## Where engineering comes in (and saves a lot of pain)

This is where a good geoprocessing architecture makes all the difference.

At **Coordenada Geo**, the rule is simple, but taken seriously:

> **each task uses the correct projection — and that is transparent for whoever uses the platform.**

In practice, this means clearly separating two worlds:

### Visualization
- **EPSG:3857 (Web Mercator)**
- optimized for tiles, front-end and interaction

### Analytical processing (in the database)

Depending on the problem, we use different projections:

- **Area calculation**
  - UTM (SIRGAS 2000 / zones, e.g. EPSG:31982–31985 in Brazil)
  - or equivalent projections suitable for the region
  - avoids severe area distortions

- **Local distance and buffers**
  - UTM or local metric projections
  - ensures that 1 km is really 1 km

- **Continental/global scale analyses**
  - geodesic operations over **EPSG:4326** (WGS84)
  - spherical/spheroidal functions (e.g. `ST_DistanceSphere`, `ST_Area(geography)` in PostGIS)

- **Routes and networks**
  - graph-based models with real-world metrics (not Web Mercator)
  - integration with road data consistent with the reference system

The core point is:

> **EPSG:3857 never enters the calculation — only the screen.**

It may sound like a detail, but this is exactly the kind of care that separates:
- a "pretty" map
- from a system that supports technical decision-making

## One last reading

The 900913 episode wasn't an accident.

It was a signal that geoprocessing had fully entered the software world.

And when that happens, some things change:

- standards start to compete with adoption
- mathematical elegance competes with performance
- and sometimes a well-crafted hack beats a perfect solution

But in the end, mature systems make peace with both sides.

## For those who want to dig deeper

- Official EPSG registry: https://epsg.org/
- 3857 definition: https://epsg.io/3857
- "Spherical Mercator" history: https://wiki.osgeo.org/wiki/Spherical_Mercator
- OpenLayers documentation on projections: https://openlayers.org/doc/tutorials/projections.html

---

If you've ever spotted a stray `SRID=900913` in some database out there,  
now you know: it wasn't a bug.

It was history — and a reminder that the wrong projection in the wrong place still costs you.
