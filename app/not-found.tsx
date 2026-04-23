import Link from 'next/link';
import NotFoundHero from '@/components/NotFoundHero';

export const metadata = {
  title: '404 — Coordenada Geo',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <NotFoundHero
        eyebrow="Erro 404"
        statusLabel="Coordenada fora do mapa"
        title="Essa coordenada não existe no nosso mapa"
        body="A página que você procura pode ter sido movida, renomeada ou ainda não foi publicada. Use os atalhos abaixo para voltar ao território conhecido."
        homeHref="/pt/"
        homeLabel="Voltar para a home"
        secondaryHref="/pt/#services"
        secondaryLabel="Conhecer serviços"
        tertiaryHref="/pt/blog/"
        tertiaryLabel="Ver o blog"
        illustrationLabel="Ilustração de uma coordenada não localizada"
      />
      <p className="bg-sand-light py-4 text-center text-sm text-ink-400 dark:bg-ink-800 dark:text-sand-light/70">
        <span className="opacity-70">Prefer English?</span>{' '}
        <Link href="/en/" className="font-semibold text-terracota underline-offset-4 hover:underline dark:text-ocre">
          Go to the English site
        </Link>
      </p>
    </main>
  );
}
