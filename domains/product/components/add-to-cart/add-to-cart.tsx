'use client';

import { addItem } from 'domains/cart/actions';
import LoadingDots from 'domains/ui/loading-dots/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import logoCart from '../../../../public/images/diver/AjouterPanier-fond-rouge.png';
import styles from './add-to-cart.module.scss';

export function AddToCart({
  variants,
  availableForSale,
  quantity
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  quantity: number;
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams?.get(option.name.toLowerCase())
      )
    );

    if (variant) {
      setSelectedVariantId(variant.id);
    }
  }, [searchParams, variants, setSelectedVariantId]);

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (!availableForSale) return;
        startTransition(async () => {
          const error = await addItem(selectedVariantId, quantity);

          if (error) {
            alert(error);
            return;
          }

          router.refresh();
        });
      }}
    >
      <div className={styles.button}>
        {availableForSale ? (
          <>
            {' '}
            <span>{'Ajout au panier'}</span>
            <Image src={logoCart} width={20} height={20} alt='cart' />
          </>
        ) : (
          'Non disponible'
        )}
      </div>
      {isPending ? <LoadingDots className='bg-white dark:bg-black' /> : null}
    </button>
  );
}
