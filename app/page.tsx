import Footer from 'components/common/footer/footer';
import AcceuilAvantages from 'components/page-accueuil/acceuil-avantages/acceuil-avantages';
import { Suspense } from 'react';
import styles from './page.module.scss';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(process.env.SITE_NAME || '')}`,
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <div className={styles.container}>
      <AcceuilAvantages />
      <Suspense>
        {/* <Carousel /> */}
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </div>
  );
}
