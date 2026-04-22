import type { Metadata } from 'next';
import { Comfortaa, Urbanist } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import './globals.css';

const display = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const sans = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Coordenada Geo',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-white font-sans text-ink-700 dark:bg-ink-900 dark:text-sand-light">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
