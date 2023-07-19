'use client';
import Grid from 'domains/grid/components/grid';
import GridProductLabels from 'domains/grid/components/grid_product-labels/grid-product-labels';
import { GridTileImage } from 'domains/grid/components/title/tile';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import promo from '../../../public/images/diver/EnPromo.png';
import styles from './product-grid-items.module.scss';
export default function ProductGridItems({ products }: { products: Product[] }) {
  const pathname = usePathname();

  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className={styles.gridItem}>
          {product?.tags?.find((tag) => tag === 'promotions') && pathname !== '/promotions' && (
            <Image src={promo} alt="promo" className={styles.promo} />
          )}
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
