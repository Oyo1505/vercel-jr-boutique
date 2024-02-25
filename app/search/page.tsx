import ProductGridItems from 'domains/layout/components/product-grid-items/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import styles from './page.module.scss';

export const metadata = {
  title: 'Recherche',
  description: 'Page de recherche de produits',
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
  alternates: {
    canonical: `/search`
  }
};

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
