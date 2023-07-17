import { GridTileImage } from 'domains/grid/components/title/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import styles from './three-items.module.scss';
function ThreeItemGridItem({ item, size }: { item: Product; size: 'full' | 'half' }) {
  return (
    <div
      className={size === 'full' ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-2 lg:row-span-1'}
    >
      <Link className='block h-full' href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          width={size === 'full' ? 1080 : 540}
          height={size === 'full' ? 1080 : 540}
          priority={true}
          alt={item.title}
          labels={{
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'epicerie'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className={styles.items} data-testid='homepage-products'>
      <ThreeItemGridItem size='full' item={firstProduct} />
      <ThreeItemGridItem size='half' item={secondProduct} />
      <ThreeItemGridItem size='half' item={thirdProduct} />
    </section>
  );
}
