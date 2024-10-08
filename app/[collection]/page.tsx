'use server';
import ProductGridItems from 'domains/layout/components/product-grid-items/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { capitalizeFirstLetter } from 'shared/utilities/capitalize-first-letter/capitaliaze-first-letter';
import styles from './page.module.scss';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    metadataBase: new URL(`https://www.jr-boutique.fr`),
    title: capitalizeFirstLetter(collection.seo?.title || collection.title).replace('_', ' '),
    description: collection.seo?.description || collection.description || `${collection.title}`,
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
    },
    robots: {
      follow: true,
      index: true,
      googleBot: {
        follow: true,
        index: true
      }
    },
    alternates: {
      canonical: `/${collection.handle}`
    }
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  return (
    <section className={styles.container}>
      {products.length === 0 ? (
        <p>{`Pas de produits disponible`}</p>
      ) : (
        <ProductGridItems products={products} limit={100} />
      )}
    </section>
  );
}
