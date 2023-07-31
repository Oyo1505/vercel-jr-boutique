import AcceuilAvantages from 'domains/page-accueuil/components/acceuil-avantages/acceuil-avantages';
import Carrousel from 'domains/page-accueuil/components/carrousel/carrousel';
import { getAllProducts } from 'lib/shopify';
import { Suspense } from 'react';

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
  const bestSellingProducts = await getAllProducts({ sortKey: 'BEST_SELLING' });
  const newProducts = await getAllProducts({ sortKey: 'CREATED_AT', reverse: true });
  return (
    <>
      <AcceuilAvantages />
      <Suspense>
        <Carrousel products={bestSellingProducts} title="Meilleurs Ventes" />
      </Suspense>
      <Suspense>
        <Carrousel products={newProducts} title="Nouveautés" />
      </Suspense>
    </>
  );
}
