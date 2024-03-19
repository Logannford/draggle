import './globals.css';
import { Cairo, Poppins, Kanit } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { Toaster } from '@/components/ui/sonner';

import StoreProvider from '@/store/store-provider';
import UserAuthentication from '@/components/user-auth';

// layout to render on every page
import Layout from '@/components/layout';

const CairoFont = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
  style: 'normal'
});

const PoppinsFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const KanitFont = Kanit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanit',
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
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
    <StoreProvider>
      <html
        lang="en"
        className={`${CairoFont.variable} ${PoppinsFont.variable} ${KanitFont.variable}`}
      >
        <body
          className="bg-[#000814] min-h-screen"
          suppressHydrationWarning={true}
        >
          <UserAuthentication>
            <Theme>
              <Layout>
                {children}
                <Toaster
                  closeButton
                  className="z-[100] group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto"
                />
              </Layout>
            </Theme>
          </UserAuthentication>
        </body>
      </html>
    </StoreProvider>
  );
}
