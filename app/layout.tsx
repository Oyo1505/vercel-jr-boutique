import Footer from 'domains/common/components/footer/footer';
import Navbar from 'domains/common/components/navbar';

import { useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';
import Container from 'domains/ui/container/container';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import 'setimmediate';
import '../styles/base.scss';
import './globals.css';
import Layout from '../domains/layout/components/layout/layout';

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

// function userLoggeddInFetch(app){
//   const fetchFunction = authenticatedFetch(app);

//   return async (uri, options) => {
//     const response = await fetchFunction(uri, options)

//     if(response.headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1'){
//       const authUrlHeader = response.headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url')
//       const redirect = Redirect.create(app)
//       redirect.dispatch(Redirect.Action.APP, authUrlHeader || '/auth')
//       return null
//     }
//     return response
//   }
// }

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
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
      </head>
      <body>
        <Layout>
          <Container>
            <Navbar />
            <Suspense>
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
