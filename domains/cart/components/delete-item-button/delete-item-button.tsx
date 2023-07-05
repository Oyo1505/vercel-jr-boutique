import clsx from 'clsx';
import { removeItem } from 'domains/cart/actions';
import CloseIcon from 'domains/icons/close';
import LoadingDots from 'domains/loading-dots';
import type { CartItem } from 'lib/shopify/types';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import styles from './delete-item-button.module.scss';

export default function DeleteItemButton({ item }: { item: CartItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label="Remove cart item"
      onClick={() => {
        startTransition(async () => {
          const error = await removeItem(item.id);

          if (error) {
            alert(error);
            return;
          }

          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(styles.closeButton, {
        'cursor-not-allowed px-0': isPending
      })}
    >
      {isPending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : (
        <CloseIcon className={styles.closeIcon} />
      )}
    </button>
  );
}
