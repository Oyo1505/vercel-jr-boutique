import clsx from 'clsx';
import Image from 'next/image';
import PlusIcon from '../../../../public/images/diver/Fleche-Haut.jpg';
import MinusIcon from '../../../../public/images/diver/Fleche-bas.jpg';
import styles from './edit-item-quantity-button-product-page.module.scss';

export default function EditItemQuantityButtonProductPage({
  type,
  quantity,
  setCount
}: {
  type: 'plus' | 'minus';
  quantity: number;
  setCount: any;
}) {
  return (
    <>
      <button
        aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
        onClick={() => {
          type === 'minus' && quantity === 1
            ? setCount(1)
            : type === 'minus' && quantity
            ? setCount(quantity - 1)
            : setCount(quantity + 1);
        }}
        disabled={false}
        className={clsx(styles.button)}
      >
        {type === 'plus' ? (
          <Image src={PlusIcon} className={styles.plusIcon} alt='plus' />
        ) : (
          <Image src={MinusIcon} className={styles.minusIcon} alt='minus' />
        )}
      </button>
    </>
  );
}
