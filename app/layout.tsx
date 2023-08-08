
import Footer from 'domains/common/components/footer/footer';
import Navbar from 'domains/common/components/navbar';
import Container from 'domains/ui/container/container';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import 'setimmediate';
import Layout from '../domains/layout/components/layout/layout';
import favicon from '../public/images/header/favicon.ico';
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
    <html lang='fr' className={inter.variable}>
      <head>
        <link
          rel='stylesheet'
          type='text/css'
          charSet='UTF-8'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
        <link rel='icon' href={favicon.src} type='image/x-icon' sizes='any'></link>
      </head>
      <body>
        <Layout>
          <Toaster />
          <Container>
            <Navbar />
            <Suspense>
              <main>{children}</main>
            </Suspense>
            <Footer />
          </Container>
        </Layout>
        <div id='portal' />
      </body>
    </html>
  );
}
