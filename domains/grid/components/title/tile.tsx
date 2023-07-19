import clsx from 'clsx';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import styles from './title.module.scss';
export function GridTileImage({
  isInteractive = true,
  active,
  labels,
  product,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  product?: Product;
  labels?: {
    title: string;
    amount: string;
    currencyCode: string;
    isSmall?: boolean;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div>
      {active !== undefined && active ? <span></span> : null}
      {props.src ? (
        <div className={styles.image}>
          <Image
            className={clsx({ isInteractive }, styles.imageGridProduct)}
            {...props}
            alt={props.title || ''}
          />
          {!product?.availableForSale && <div className={styles.indisponible}>Indisponible</div>}
        </div>
      ) : null}
      {labels ? (
        <div>
          <h3 data-testid="product-name" className={styles.title}>
            {labels.title}
          </h3>
          <div className={styles.containerPrice}>
            <div className={styles.price}>{parseFloat(labels.amount)} €</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
