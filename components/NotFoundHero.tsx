import Link from 'next/link';
import { ArrowLeft, MapPinOff, Compass, Search } from 'lucide-react';
import type { ReactNode } from 'react';

export type NotFoundHeroProps = {
  eyebrow: string;
  statusLabel?: string;
  title: string;
  body: string;
  /** Primary CTA — usually back to home. */
  homeHref: string;
  homeLabel: string;
  /** Optional secondary CTA (e.g. services anchor). */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Optional tertiary CTA (e.g. blog). */
  tertiaryHref?: string;
  tertiaryLabel?: string;
  /** Slot for custom illustration, defaults to the "lost coordinate" motif. */
  illustration?: ReactNode;
  illustrationLabel?: string;
};

function LostCoordinateIllustration({ label }: { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80"
    >
      {/* soft glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,theme(colors.terracota.light/.35)_0%,transparent_60%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,theme(colors.ocre.500/.3)_0%,transparent_60%)]"
      />

      {/* coordinate grid */}
      <svg
        aria-hidden
        viewBox="0 0 320 320"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-ink/15 dark:text-white/15"
            />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="black" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id="fadeMask">
            <rect width="320" height="320" fill="url(#fade)" />
          </mask>
        </defs>
        <rect width="320" height="320" fill="url(#grid)" mask="url(#fadeMask)" />

        {/* axes crosshair */}
        <line
          x1="0"
          y1="160"
          x2="320"
          y2="160"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="2 6"
          className="text-ink/25 dark:text-white/25"
        />
        <line
          x1="160"
          y1="0"
          x2="160"
          y2="320"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="2 6"
          className="text-ink/25 dark:text-white/25"
        />

        {/* search radius pulse */}
        <circle
          cx="160"
          cy="160"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="origin-center text-terracota/60 dark:text-ocre/60 motion-safe:animate-[spin_30s_linear_infinite]"
        />
        <circle
          cx="160"
          cy="160"
          r="86"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-terracota/30 dark:text-ocre/30"
        />

        {/* ghost dashed pin — "where it should have been" */}
        <circle
          cx="160"
          cy="160"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="text-terracota dark:text-ocre"
        />

        {/* big, stylised 404 */}
        <text
          x="160"
          y="232"
          textAnchor="middle"
          className="fill-ink/10 font-display text-[88px] font-black tracking-tight dark:fill-white/10"
          style={{ letterSpacing: '-0.05em' }}
        >
          404
        </text>
      </svg>

      {/* floating pin-off badge */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-ink/10 motion-safe:animate-[pulse_3s_ease-in-out_infinite] dark:bg-ink-800 dark:ring-white/10">
          <MapPinOff className="h-10 w-10 text-terracota dark:text-ocre" />
        </div>
      </div>
    </div>
  );
}

export default function NotFoundHero({
  eyebrow,
  statusLabel,
  title,
  body,
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  tertiaryHref,
  tertiaryLabel,
  illustration,
  illustrationLabel,
}: NotFoundHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-sand-light dark:bg-ink-800">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.sand.DEFAULT)_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,theme(colors.ocre.100)_0%,transparent_55%)] opacity-80 dark:bg-[radial-gradient(ellipse_at_top,theme(colors.ink.700)_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,theme(colors.ocre.700/.25)_0%,transparent_55%)]"
      />

      <div className="container-x relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-terracota/20 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-terracota backdrop-blur dark:border-ocre/30 dark:bg-white/5 dark:text-ocre">
            <Compass aria-hidden className="h-3.5 w-3.5" />
            {statusLabel ?? eyebrow}
          </span>

          <p className="mt-6 font-display text-sm font-bold uppercase tracking-[0.35em] text-terracota dark:text-ocre">
            {eyebrow}
          </p>
          <h1 className="heading-xl mt-3">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-400 dark:text-sand-light/90">{body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={homeHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-terracota px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-terracota-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocre dark:bg-terracota-light dark:hover:bg-terracota"
            >
              <ArrowLeft className="h-4 w-4" /> {homeLabel}
            </Link>

            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/15 transition hover:bg-sand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocre dark:bg-white/5 dark:text-sand-light dark:ring-white/15 dark:hover:bg-white/10"
              >
                <Compass className="h-4 w-4" /> {secondaryLabel}
              </Link>
            ) : null}

            {tertiaryHref && tertiaryLabel ? (
              <Link
                href={tertiaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink/80 transition hover:text-terracota focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocre dark:text-sand-light/90 dark:hover:text-ocre"
              >
                <Search className="h-4 w-4" /> {tertiaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-5">
          {illustration ?? <LostCoordinateIllustration label={illustrationLabel} />}
        </div>
      </div>
    </section>
  );
}
