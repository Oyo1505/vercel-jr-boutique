import ProductGridItems from 'domains/layout/components/product-grid-items/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import styles from './page.module.scss';
import { Metadata } from 'next';
export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact',
    description: 'Contact JR Distribution',
    verification: {
      google: 'google'
    },
    alternates: {
      canonical: `/search`
    }
  };
}
export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });

  return (
    <>
      {searchValue ? (
        <p className={styles.noResult}>{products.length === 0 && 'Aucun résultat '}</p>
      ) : null}
      {products.length > 0 ? (
        <ul className={styles.searchContainer}>
          <ProductGridItems products={products} limit={100} />
        </ul>
      ) : null}
    </>
  );
}
