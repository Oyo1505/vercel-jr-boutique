import Analytics from 'domains/common/components/analytics/analytics';
import Footer from 'domains/common/components/footer/footer';
import Navbar from 'domains/common/components/navbar';
import Container from 'domains/ui/container/container';
import { Courgette } from 'next/font/google';
import Script from 'next/script';
import { ReactNode, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import 'setimmediate';
import Layout from '../domains/layout/components/layout/layout';
import favicon from '../public/images/header/favicon.ico';
import '../styles/base.scss';
import './globals.css';
import Loading from './loading';
import FloatingButtonCart from 'domains/cart/components/floating-button-cart/floating-button-cart';
import { headers } from 'next/headers';
import useGetPanier from 'domains/cart/hooks/use-get-panier';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description:
    'JR Distribution vous offre la Franche-Comté en un clic. Vente en ligne de fromages, produits régionnaux... ',
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const headersList = headers();
  const { cart, cartIdUpdated } = await useGetPanier();
  const userAgent = headersList.get('user-agent');
  const isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

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
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM}');
        `
          }}
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        ></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}',{
            page_path: window.location.pathname,
        });`}
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
              {isMobileView && cart && (
                <FloatingButtonCart cart={cart} cartIdUpdated={cartIdUpdated} />
              )}
            </Suspense>
            <Footer />
          </Container>
        </Layout>
        <div id="portal" />
      </body>
    </html>
  );
}
