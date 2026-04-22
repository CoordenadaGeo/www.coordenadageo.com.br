'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  items?: NavItem[];
};

export function DesktopNav({ groups }: { groups: NavGroup[] }) {
  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
      {groups.map((g) => (
        <DesktopItem key={g.label} group={g} />
      ))}
    </nav>
  );
}

function DesktopItem({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 260);
  }
  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!group.items?.length) {
    return (
      <Link
        href={group.href ?? '#'}
        className="inline-flex justify-center rounded-full px-3 py-2 text-sm font-medium text-ink/80 transition hover:bg-ink/5 hover:text-terracota dark:text-sand-light/90 dark:hover:bg-white/5 dark:hover:text-ocre"
      >
        {group.label}
      </Link>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink/80 transition hover:bg-ink/5 hover:text-terracota dark:text-sand-light/90 dark:hover:bg-white/5 dark:hover:text-ocre"
      >
        {group.label}
        <ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        id={menuId}
        role="menu"
        className={`absolute left-1/2 top-full z-50 mt-2 min-w-[15rem] -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-2 shadow-xl transition-all duration-200 before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-[''] dark:border-white/10 dark:bg-ink-800 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        {group.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm text-ink/80 transition hover:bg-sand-light hover:text-ink dark:text-sand-light/90 dark:hover:bg-white/5 dark:hover:text-sand-light"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileNav({ groups, ctaHref, ctaLabel }: { groups: NavGroup[]; ctaHref: string; ctaLabel: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-terracota hover:text-terracota dark:border-white/15 dark:text-sand-light lg:hidden"
      >
        <span className="sr-only">Menu</span>
        <div className="relative h-3 w-4">
          <span className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-all duration-200 ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition-all duration-200 ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </div>
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 top-0 max-h-full overflow-y-auto bg-white p-6 pt-24 shadow-2xl dark:bg-ink-800">
            <ul className="space-y-1">
              {groups.map((g) => (
                <li key={g.label}>
                  {g.items?.length ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded === g.label}
                        onClick={() => setExpanded((v) => (v === g.label ? null : g.label))}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-display text-lg font-bold text-ink transition hover:bg-sand-light dark:text-sand-light dark:hover:bg-white/5"
                      >
                        {g.label}
                        <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-200 ${expanded === g.label ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`grid transition-[grid-template-rows] duration-200 ${expanded === g.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <ul className="overflow-hidden">
                          {g.items.map((it) => (
                            <li key={it.href}>
                              <Link
                                href={it.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-6 py-2 text-sm text-ink/80 transition hover:bg-sand-light hover:text-ink dark:text-sand-light/90 dark:hover:bg-white/5"
                              >
                                {it.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={g.href ?? '#'}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 font-display text-lg font-bold text-ink transition hover:bg-sand-light dark:text-sand-light dark:hover:bg-white/5"
                    >
                      {g.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-terracota px-5 py-3 text-sm font-semibold text-white transition hover:bg-terracota-dark"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
