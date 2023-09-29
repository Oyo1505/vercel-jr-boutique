import AcceuilAvantages from 'domains/page-accueuil/components/acceuil-avantages/acceuil-avantages';
import Carrousel from 'domains/page-accueuil/components/carrousel/carrousel';
import { getAllProducts } from 'lib/shopify';
import Head from 'next/head';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description:
    'Découvrez la saveur authentique de la Franche-Comté avec JR Distribution. Explorez nos délices régionaux, des fromages exquis aux saucisses de Morteau fumées. Rejoignez-nous pour une expérience gustative régionale exceptionnelle !',
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
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}',{
            page_path: window.location.pathname,
        });`
          }}
        ></script>
      </Head>
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
