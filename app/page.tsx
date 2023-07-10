import AcceuilAvantages from 'domains/page-accueuil/acceuil-avantages/acceuil-avantages';
import Carrousel from 'domains/page-accueuil/carrousel/carrousel';
import { getAllProducts } from 'lib/shopify';

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
  const newProducts = await getAllProducts({ sortKey: 'BEST_SELLING' });
  return (
    <>
      <AcceuilAvantages />
      <Carrousel products={bestSellingProducts} title="Meilleurs Ventes" />
      <Carrousel products={newProducts} title="Nouveautés" />
    </>
  );
}
