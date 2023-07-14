'use client';

import { Product } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

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
    variant?.[0]?.price.amount /
    (Number(variant?.[0]?.selectedOptions?.[0]?.value) /
      Number(variant?.[0]?.unitPriceMeasurement?.referenceValue));
  return (
    <>
      {referenceWeight} €/{' '}
      {variant?.[0]?.unitPriceMeasurement?.referenceUnit === 'G' ||
      variant?.[0]?.unitPriceMeasurement?.referenceUnit === 'KG'
        ? 'Kilo'
        : 'Litre'}{' '}
    </>
  );
};

export default PriceBySize;
