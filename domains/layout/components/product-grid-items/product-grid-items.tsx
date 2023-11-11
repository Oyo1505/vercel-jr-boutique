'use client';
import Grid from 'domains/grid/components/grid';
import GridProductLabels from 'domains/grid/components/grid_product-labels/grid-product-labels';
import { GridTileImage } from 'domains/grid/components/title/tile';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import promo from '../../../../public/images/diver/EnPromo.png';
import styles from './product-grid-items.module.scss';

export default function ProductGridItems({
  products,
  limit = 2
}: {
  products: Product[];
  limit: number;
}) {
  const pathname = usePathname();

  return (
    <Suspense>
      {products.map(
        (product, index) =>
          index <= limit && (
            <Grid.Item key={product.handle} className={styles.gridItem}>
              {product?.tags?.find((tag) => tag === 'promotions') && pathname !== '/promotions' && (
                <Image src={promo} alt="promo" className={styles.promo} unoptimized={true} />
              )}
              <Link
                href={`/product/${product.handle}`}
                aria-label={`poduct-related-${product.handle}`}
              >
                <GridTileImage
                  alt={product.title}
                  src={product.featuredImage?.url}
                  product={product}
                  width={215}
                  height={215}
                />
              </Link>
              <GridProductLabels product={product} />
            </Grid.Item>
          )
      )}
    </Suspense>
  );
}
