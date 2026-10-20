import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Callejeros Río IV • Adopción Responsable y Alerta de Mascotas',
  description:
    'Red comunitaria de adopción responsable y alerta de animales extraviados en los barrios de la ciudad de Río Cuarto (Córdoba, Argentina).',
  keywords: [
    'Callejeros Rio Cuarto',
    'Adopción de perros Rio Cuarto',
    'Perros perdidos Rio Cuarto',
    'Mascotas en adopcion',
    'Parque Sarmiento',
    'Refugio animal',
  ],
  authors: [{ name: 'Comunidad Callejeros Río IV' }],
  metadataBase: new URL('https://callejerosrioiv.org'),
  openGraph: {
    title: 'Callejeros Río IV • Red Comunitaria de Adopción',
    description:
      'Encontrá a tu próximo compañero de vida o reportá mascotas perdidas en Río Cuarto.',
    images: ['/images/logo.jpg'],
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#FDFBF7] dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 transition-colors">
        <Navbar />
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
