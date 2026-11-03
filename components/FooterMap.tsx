'use client';

import { useEffect, useRef } from 'react';
import type { StyleSpecification } from 'maplibre-gl';

// Florianópolis-SC
const PIN: [number, number] = [-48.548, -27.5954];

// Paleta da marca (tailwind.config.ts)
const C = {
  water: '#011521', // ink-700: o mar, mais escuro, se funde ao fundo do rodapé
  land: '#0c3450',
  green: '#0e3953',
  building: '#134262',
  roadMinor: '#174a6a',
  roadMajor: '#245a7c',
  motorway: '#3a6d8f',
  label: '#8fa5b3',
  labelStrong: '#bfccd5',
};

/** Estilo vetorial mínimo, desenhado para a marca (técnica "snazzy"). */
const STYLE: StyleSpecification = {
  version: 8,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    omt: {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet',
      attribution:
        '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    },
  },
  layers: [
    { id: 'bg', type: 'background', paint: { 'background-color': C.land } },
    {
      id: 'green',
      type: 'fill',
      source: 'omt',
      'source-layer': 'landcover',
      filter: ['in', ['get', 'class'], ['literal', ['wood', 'grass', 'farmland']]],
      paint: { 'fill-color': C.green },
    },
    { id: 'water', type: 'fill', source: 'omt', 'source-layer': 'water', paint: { 'fill-color': C.water } },
    {
      id: 'building',
      type: 'fill',
      source: 'omt',
      'source-layer': 'building',
      minzoom: 13,
      paint: { 'fill-color': C.building },
    },
    {
      id: 'road-minor',
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      minzoom: 12,
      filter: ['in', ['get', 'class'], ['literal', ['minor', 'service', 'tertiary']]],
      paint: { 'line-color': C.roadMinor, 'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.4, 16, 2] },
    },
    {
      id: 'road-major',
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      filter: ['in', ['get', 'class'], ['literal', ['primary', 'secondary', 'trunk']]],
      paint: { 'line-color': C.roadMajor, 'line-opacity': 0.8, 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.4, 16, 3] },
    },
    {
      id: 'motorway',
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      filter: ['==', ['get', 'class'], 'motorway'],
      paint: { 'line-color': C.motorway, 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.6, 16, 4] },
    },
    {
      id: 'place-city',
      type: 'symbol',
      source: 'omt',
      'source-layer': 'place',
      filter: ['in', ['get', 'class'], ['literal', ['city', 'town']]],
      minzoom: 8,
      layout: {
        'text-field': ['coalesce', ['get', 'name:pt'], ['get', 'name']],
        'text-font': ['Noto Sans Regular'],
        'text-size': 12,
        'text-letter-spacing': 0.12,
        'text-transform': 'uppercase',
        'text-offset': [0, 1.4],
      },
      paint: { 'text-color': C.labelStrong, 'text-opacity': 0.8, 'text-halo-color': C.water, 'text-halo-width': 1.2 },
    },
  ],
};

/**
 * Faixa de mapa no topo do rodapé.
 * MapLibre só é baixado quando o rodapé se aproxima da tela; tiles e fontes vêm do
 * OpenFreeMap (gratuito, sem chave, uso comercial permitido).
 */
export default function FooterMap({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import('maplibre-gl').Map | undefined;
    let cancelled = false;

    const init = async () => {
      const [{ default: maplibregl }] = await Promise.all([
        import('maplibre-gl'),
        import('maplibre-gl/dist/maplibre-gl.css'),
      ]);
      if (cancelled || !ref.current) return;

      const wide = el.clientWidth >= 768;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Desloca o pino para a direita no desktop (o cartão fica à esquerda)
      // e para cima no celular (o cartão fica embaixo).
      const padding = wide
        ? { left: el.clientWidth * 0.42, right: 0, top: 0, bottom: 0 }
        : { left: 0, right: 0, top: 0, bottom: 170 };

      map = new maplibregl.Map({
        container: el,
        style: STYLE,
        center: PIN,
        zoom: reduce ? 11.3 : 9.6,
        attributionControl: { compact: true },
        scrollZoom: false,
        dragRotate: false,
        pitchWithRotate: false,
        touchZoomRotate: false,
        dragPan: wide,
        keyboard: false,
        doubleClickZoom: wide,
      });
      map.setPadding(padding);
      // No celular a atribuição fica recolhida no botão "i" para não cobrir o cartão.
      if (!wide) {
        map.once('load', () =>
          el.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show'),
        );
      }

      const pin = document.createElement('div');
      pin.className = 'footer-map-pin';
      new maplibregl.Marker({ element: pin }).setLngLat(PIN).addTo(map);

      if (!reduce) {
        map.once('load', () => map?.flyTo({ center: PIN, zoom: 11.3, duration: 2600, essential: false }));
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void init();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
    };
  }, []);

  // O CSS do MapLibre força position: relative no contêiner do mapa,
  // por isso o posicionamento absoluto fica num wrapper.
  return (
    <div className="absolute inset-0">
      <div ref={ref} role="region" aria-label={label} className="footer-map h-full w-full" />
    </div>
  );
}
