import clsx from 'clsx';
import Image from 'next/image';
import ShoppingBagIcon from '../../public/images/header/PanierMenu.webp';
import styles from './cart.module.scss';
export default function CartIcon({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className={styles.conatainer}>
      <Image src={ShoppingBagIcon} className={clsx(className)} alt='panier' />
      {quantity ? <div className={styles.quantity}>{quantity}</div> : null}
    </div>
  );
}
