import clsx from 'clsx';
import { removeItem, updateItemQuantity } from 'domains/cart/actions';
import LoadingDots from 'domains/ui/loading-dots/loading-dots';
import type { CartItem } from 'lib/shopify/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import PlusIcon from '../../../../public/images/diver/Fleche-Haut.jpg';
import MinusIcon from '../../../../public/images/diver/Fleche-bas.jpg';
import styles from './edit-item-quantity-button.module.scss';

export default function EditItemQuantityButton({
  item,
  type
}: {
  item: CartItem;
  type: 'plus' | 'minus';
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      onClick={() => {
        startTransition(async () => {
          const error =
            type === 'minus' && item.quantity - 1 === 0
              ? await removeItem(item.id)
              : await updateItemQuantity({
                  lineId: item.id,
                  variantId: item.merchandise.id,
                  quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
                });

          if (error) {
            alert(error);
            return;
          }
          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(styles.button, isPending && styles.isPending)}
    >
      {isPending ? (
        <LoadingDots className={styles.loadingDots} />
      ) : type === 'plus' ? (
        <Image src={PlusIcon} className={styles.plusIcon} alt='plus' />
      ) : (
        <Image src={MinusIcon} className={styles.minusIcon} alt='minus' />
      )}
    </button>
  );
}
