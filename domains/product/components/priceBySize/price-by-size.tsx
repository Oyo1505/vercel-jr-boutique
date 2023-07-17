'use client';

import { Product } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import computePrice from 'shared/utilities/compute-price/compute-price';
import styles from './price-by-size.module.scss';

interface Props {
  product: Product;
}

const PriceBySize: FC<Props> = ({ product }) => {
  const searchParams = useSearchParams().toString();
  const valueOption = searchParams.slice(searchParams.indexOf('=') + 1);
  const variant = product?.variants?.filter(
    (variant) => variant.selectedOptions?.[0]?.value === valueOption
  ) as any;
  const referenceWeight =
    searchParams ? 
    variant?.[0]?.price.amount /
    (Number(variant?.[0]?.selectedOptions?.[0]?.value) /
      Number(variant?.[0]?.unitPriceMeasurement?.referenceValue)) : product?.priceRange?.minVariantPrice?.amount as  any / (Number(product?.variants?.[0]?.unitPriceMeasurement?.quantityValue) / Number(product?.variants?.[0]?.unitPriceMeasurement?.referenceValue));
      
  return (
    <>
      {computePrice(referenceWeight)}€ /
      {variant?.[0]?.unitPriceMeasurement?.referenceUnit === 'G' ||product?.variants?.[0]?.unitPriceMeasurement?.referenceUnit === 'G' ||
      variant?.[0]?.unitPriceMeasurement?.referenceUnit === 'KG'|| product?.variants?.[0]?.unitPriceMeasurement?.referenceUnit === 'KG' 
        ? <span className={styles.referenceWeight}>{' '}Kilo</span>
        : <span className={styles.referenceWeight}>{' '}Litre</span>}
    </>
  );
};

export default PriceBySize;
