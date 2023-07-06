'use client';
import Grid from 'domains/grid/components/grid';
import GridProductLabels from 'domains/grid/components/grid_product-labels/grid-product-labels';
import { GridTileImage } from 'domains/grid/components/title/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import styles from './product-grid-items.module.scss';
export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className={styles.gridItem}>
          <Link href={`/product/${product.handle}`}>
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
      ))}
    </>
  );
}
