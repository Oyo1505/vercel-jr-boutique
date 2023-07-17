'use client';

import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import styles from './variant-selector.module.scss';
type ParamsMap = {
  [key: string]: string; // ie. { color: 'Red', size: 'Large', ... }
};

type OptimizedVariant = {
  id: string;
  availableForSale: boolean;
  params: URLSearchParams;
  [key: string]: string | boolean | URLSearchParams; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];

}) {
  const pathname = usePathname();
  const currentParams = useSearchParams();
  const router = useRouter();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);
  useEffect(() => {}, []);
  if (hasNoOptionsOrJustOneOption) {
    return null;
  }
  // Discard any unexpected options or values from url and create params map.
  const paramsMap: ParamsMap = Object.fromEntries(
    Array.from(currentParams!.entries()).filter(([key, value]) =>
      options.find((option) => option.name.toLowerCase() === key && option.values.includes(value))
    )
  );

  // Optimize variants for easier lookups.
  const optimizedVariants: OptimizedVariant[] = variants.map((variant) => {
    const optimized: OptimizedVariant = {
      id: variant.id,
      availableForSale: variant.availableForSale,
      params: new URLSearchParams()
    };

    variant.selectedOptions.forEach((selectedOption) => {
      const name = selectedOption.name.toLowerCase();
      const value = selectedOption.value;

      optimized[name] = value;
      optimized.params.set(name, value);
    });

    return optimized;
  });

  // Find the first variant that is:
  //
  // 1. Available for sale
  // 2. Matches all options specified in the url (note that this
  //    could be a partial match if some options are missing from the url).
  //
  // If no match (full or partial) is found, use the first variant that is
  // available for sale.
  const selectedVariant: OptimizedVariant | undefined =
    optimizedVariants.find(
      (variant) =>
        variant.availableForSale &&
        Object.entries(paramsMap).every(([key, value]) => variant[key] === value)
    ) || optimizedVariants.find((variant) => variant.availableForSale);

  const selectedVariantParams = new URLSearchParams(selectedVariant?.params);
  const currentUrl = createUrl(pathname!, currentParams!);
  const selectedVariantUrl = createUrl(pathname!, selectedVariantParams);

  if (currentUrl !== selectedVariantUrl) {
    router.replace(selectedVariantUrl);
  }
  // Base option params on selected variant params.
  const optionParams = new URLSearchParams(selectedVariantParams);

  return options.map((option) => (
    <select
      key={option.id}
      className={styles.select}
      onChange={(e) => {
        // Update the params using the current option to reflect how the url would change.
        optionParams.set(option.name.toLowerCase(), e.target.value);
        const optionUrl = createUrl(pathname!, optionParams);
        router.replace(optionUrl);
      }}
    >
      {option.values.map((value) => (
        <option key={value}>{value} </option>
      ))}
    </select>
  ));
}
