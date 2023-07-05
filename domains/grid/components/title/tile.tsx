import clsx from 'clsx';
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
  product?: any;
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
        <Image className={clsx({ isInteractive })} {...props} alt={props.title || ''} />
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
