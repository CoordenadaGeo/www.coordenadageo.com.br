import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, Compass } from 'lucide-react';
import type { ReactNode } from 'react';

export type ComingSoonStatusItem = {
  label: string;
  /** 'done' | 'current' | 'next' */
  state?: 'done' | 'current' | 'next';
};

export type ComingSoonProps = {
  /** Small caption above the title (e.g. "Em breve", "Em construção"). */
  eyebrow: string;
  /** Main headline. */
  title: string;
  /** Supporting paragraph explaining what is coming. */
  body: string;
  /** Optional estimated timeframe, rendered as a subtle chip. */
  eta?: string;
  /** Optional short status label for the pulsing chip (defaults to eyebrow). */
  statusLabel?: string;
  /** Optional progress-like checklist to hint at maturity/phases. */
  steps?: ComingSoonStatusItem[];
  /** Primary CTA: link back to safe ground (usually the homepage). */
  homeHref: string;
  homeLabel: string;
  /** Optional contact line above the secondary CTAs. */
  contactHeading?: string;
  /** Optional mailto address. */
  email?: string;
  emailLabel?: string;
  /** Optional WhatsApp number in E.164 (digits only). */
  whatsapp?: string;
  whatsappLabel?: string;
  /** Slot for a custom illustration. Defaults to an animated geospatial motif. */
  illustration?: ReactNode;
};

function DefaultIllustration() {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80"
    >
      {/* soft radial glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.ocre.200)_0%,transparent_60%)] opacity-60 blur-2xl dark:bg-[radial-gradient(circle_at_center,theme(colors.ocre.500/.35)_0%,transparent_60%)]" />

      {/* concentric rings */}
      <div className="absolute inset-0 rounded-full border border-ink/10 dark:border-white/10" />
      <div className="absolute inset-4 rounded-full border border-dashed border-terracota/30 dark:border-ocre/30" />
      <div className="absolute inset-10 rounded-full border border-ink/10 dark:border-white/10" />
      <div className="absolute inset-16 rounded-full border border-dashed border-moss/40" />

      {/* slow rotating ring with satellite dot */}
      <div className="absolute inset-4 animate-[spin_22s_linear_infinite] motion-reduce:animate-none">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracota shadow-[0_0_12px_theme(colors.terracota.light)]" />
      </div>
      <div className="absolute inset-10 animate-[spin_36s_linear_infinite_reverse] motion-reduce:animate-none">
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocre shadow-[0_0_10px_theme(colors.ocre.300)]" />
      </div>

      {/* crosshair */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full bg-ink/10 dark:bg-white/10" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-px bg-ink/10 dark:bg-white/10" />
      </div>

      {/* centerpiece */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-ink/10 dark:bg-ink-800 dark:ring-white/10">
          <Compass className="h-10 w-10 text-terracota dark:text-ocre" />
        </div>
      </div>
    </div>
  );
}

export default function ComingSoon({
  eyebrow,
  title,
  body,
  eta,
  statusLabel,
  steps,
  homeHref,
  homeLabel,
  contactHeading,
  email,
  emailLabel,
  whatsapp,
  whatsappLabel,
  illustration,
}: ComingSoonProps) {
  return (
    <section className="relative isolate overflow-hidden bg-sand-light dark:bg-ink-800">
      {/* decorative gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.sand.DEFAULT)_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,theme(colors.ocre.100)_0%,transparent_55%)] opacity-80 dark:bg-[radial-gradient(ellipse_at_top,theme(colors.ink.700)_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,theme(colors.ocre.700/.25)_0%,transparent_55%)]"
      />

      <div className="container-x relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          {/* animated status chip */}
          <span className="inline-flex items-center gap-2 rounded-full border border-terracota/20 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-terracota backdrop-blur dark:border-ocre/30 dark:bg-white/5 dark:text-ocre">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracota opacity-60 motion-reduce:animate-none dark:bg-ocre" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terracota dark:bg-ocre" />
            </span>
            {statusLabel ?? eyebrow}
          </span>

          <h1 className="heading-xl mt-6">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-400 dark:text-sand-light/90">{body}</p>

          {eta ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm text-ink-500 ring-1 ring-inset ring-ink/10 dark:bg-white/5 dark:text-sand-light/80 dark:ring-white/10">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-moss-400" />
              {eta}
            </p>
          ) : null}

          {steps?.length ? (
            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
              {steps.map((s, i) => {
                const state = s.state ?? 'next';
                const badgeClass =
                  state === 'done'
                    ? 'bg-moss-400 text-white'
                    : state === 'current'
                      ? 'bg-terracota text-white'
                      : 'bg-ink/10 text-ink-500 dark:bg-white/10 dark:text-sand-light/70';
                return (
                  <li
                    key={s.label}
                    className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white/70 p-4 text-sm text-ink-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-sand-light/90"
                  >
                    <span
                      aria-hidden
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${badgeClass}`}
                    >
                      {state === 'done' ? '✓' : i + 1}
                    </span>
                    <span className="leading-snug">{s.label}</span>
                  </li>
                );
              })}
            </ol>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={homeHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-terracota px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-terracota-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocre dark:bg-terracota-light dark:hover:bg-terracota"
            >
              <ArrowLeft className="h-4 w-4" /> {homeLabel}
            </Link>

            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/15 transition hover:bg-sand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocre dark:bg-white/5 dark:text-sand-light dark:ring-white/15 dark:hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> {emailLabel ?? email}
              </a>
            ) : null}

            {whatsapp ? (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/15 transition hover:bg-sand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocre dark:bg-white/5 dark:text-sand-light dark:ring-white/15 dark:hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> {whatsappLabel ?? 'WhatsApp'}
              </a>
            ) : null}
          </div>

          {contactHeading ? (
            <p className="mt-4 text-sm text-ink-400 dark:text-sand-light/70">{contactHeading}</p>
          ) : null}
        </div>

        <div className="lg:col-span-5">{illustration ?? <DefaultIllustration />}</div>
      </div>
    </section>
  );
}
