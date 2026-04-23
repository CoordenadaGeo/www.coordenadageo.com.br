import NotFoundShell from '@/components/NotFoundShell';

export const metadata = {
  title: '404 — Coordenada Geo',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundShell />;
}
