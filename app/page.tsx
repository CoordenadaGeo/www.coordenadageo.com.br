'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Root `/` route: redirects to the default locale. Using a client redirect so it
// works on static hosting (GitHub Pages).
export default function RootPage() {
  useEffect(() => {
    window.location.replace('/pt/');
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <p>
        Redirecionando para <Link href="/pt/">/pt/</Link>…
      </p>
    </div>
  );
}
