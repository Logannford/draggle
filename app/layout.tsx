import './globals.css';
import { Cairo, Karla, ABeeZee } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import StoreProvider from '@/StoreProvider';

// layout to render on every page
import Layout from '@/components/layout';

const CairoFont = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
  style: 'normal'
});

const KarlaFont = Karla({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-karla',
  style: 'normal'
});

const ABeeZeeFont = ABeeZee({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-abeezee',
  style: 'normal',
  weight: '400'
});

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${CairoFont.className} ${KarlaFont.className} ${ABeeZeeFont.className}`}
    >
      <body
        className="bg-[#000814]"
        suppressHydrationWarning={true}
      >
        <Theme>
          <Layout>
            <StoreProvider children={children}></StoreProvider>
          </Layout>
        </Theme>
      </body>
    </html>
  );
}
