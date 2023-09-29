import Analytics from 'domains/common/components/analytics/analytics';
import Footer from 'domains/common/components/footer/footer';
import Navbar from 'domains/common/components/navbar';
import Container from 'domains/ui/container/container';
import { Courgette } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import 'setimmediate';
import Layout from '../domains/layout/components/layout/layout';
import favicon from '../public/images/header/favicon.ico';
import '../styles/base.scss';
import './globals.css';
import Loading from './loading';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  alternates: {
    canonical: `${process.env.DOMAIN_URL}`
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

const courgette = Courgette({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={courgette.className}>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="icon" href={favicon.src} type="image/x-icon" sizes="any"></link>

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        ></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-SDBHLWS6N5');`}
        </script>
      </head>
      <body>
        <Layout>
          <Analytics />
          <Toaster />
          <Container>
            <Navbar />
            <Suspense fallback={<Loading />}>
              <main>{children}</main>
            </Suspense>
            <Footer />
          </Container>
        </Layout>
        <div id="portal" />
      </body>
    </html>
  );
}
