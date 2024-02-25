import AcceuilAvantages from 'domains/page-accueuil/components/acceuil-avantages/acceuil-avantages';
import Carrousel from 'domains/page-accueuil/components/carrousel/carrousel';
import { getAllProducts } from 'lib/shopify';
import { Suspense } from 'react';

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  alternates: {
    canonical: `/`
  },
  title: process.env.SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  googleBot: {
    index: true,
    follow: true,
  },
  description:
    'JR Distribution vous offre la Franche-Comté en un clic. Vente en ligne de fromages, produits régionnaux... ',
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
  const bestSellingProducts = await getAllProducts({ sortKey: 'BEST_SELLING', first: 12 });
  const newProducts = await getAllProducts({ sortKey: 'CREATED_AT', reverse: true, first: 12 });
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
