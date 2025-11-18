import type { Metadata } from 'next';
import { Archivo_Black, IBM_Plex_Mono, Orbitron } from 'next/font/google';
import '@/styles/globals.css';

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-header',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

const orbitron = Orbitron({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-accent',
});

export const metadata: Metadata = {
  title: 'Calcif.ai - AI-Powered Task Classification',
  description:
    'Brutalist retro-futuristic task management with AI-powered classification. CLASSIFY. CALCIFY. COMPLETE.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${archivoBlack.variable} ${ibmPlexMono.variable} ${orbitron.variable} antialiased`}
      >
        <div className="min-h-screen bg-concrete-brutalist">{children}</div>
      </body>
    </html>
  );
}
