import Navbar from 'domains/common/navbar';
import Container from 'domains/ui/container/container';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import '../styles/base.scss';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: 'summary_large_image',
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE
      }
    })
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <Container>
          <Navbar />
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </Container>
      </body>
    </html>
  );
}
