import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '4rem 2rem', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404</h1>
      <p>
        <Link href="/pt/">Voltar ao início</Link>
      </p>
    </div>
  );
}
