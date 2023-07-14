'use client';

import { Product } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import styles from './price-product-page.module.scss';

interface Props {
  product: Product;
}

const PriceProductPage: FC<Props> = ({ product }) => {
  const searchParams = useSearchParams().toString();
  const valueOption = searchParams.slice(searchParams.indexOf('=') + 1);
  console.log(product?.variants?.[0]?.price.amount);
  const variant = product?.variants?.filter(
    (variant) => variant.selectedOptions?.[0]?.value === valueOption
  ) as any;

  return (
    <>
      {searchParams ? variant?.[0]?.price.amount : product?.variants?.[0]?.price.amount} €{' '}
      <span className={styles.ttc}>TTC</span>
    </>
  );
};

export default PriceProductPage;
