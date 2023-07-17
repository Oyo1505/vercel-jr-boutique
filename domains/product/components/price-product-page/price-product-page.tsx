'use client';

import { Product, ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import computePrice from 'shared/utilities/compute-price/compute-price';
import styles from './price-product-page.module.scss';

interface Props {
  product: Product;
}

const PriceProductPage: FC<Props> = ({ product }) => {
  const searchParams = useSearchParams().toString();
  const valueOption = searchParams.slice(searchParams.indexOf('=') + 1);
  const variant = product?.variants?.filter(
    (variant) => variant.selectedOptions?.[0]?.value === valueOption
  ) as ProductVariant[];

  return (
    <>
      {searchParams ? computePrice(Number(variant?.[0]?.price.amount)) : computePrice(Number(product?.variants?.[0]?.price?.amount))} €{' '}
      <span className={styles.ttc}>TTC</span>
    </>
  );
};

export default PriceProductPage;
