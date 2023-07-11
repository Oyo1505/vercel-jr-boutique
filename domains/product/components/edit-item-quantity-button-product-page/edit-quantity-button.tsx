import clsx from 'clsx';
import type { Product } from 'lib/shopify/types';
import Image from 'next/image';
import PlusIcon from '../../../../public/images/diver/Fleche-Haut.jpg';
import MinusIcon from '../../../../public/images/diver/Fleche-bas.jpg';
import { AddToCart } from '../add-to-cart/add-to-cart';
import styles from './edit-item-quantity-button-product-page.module.scss';

export default function EditItemQuantityButtonProductPage({
  type,
  product,
  quantity
}: {
  product: Product;
  type: 'plus' | 'minus';
  quantity: number;
}) {
  return (
    <>
      <div>
        <button
          aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
          onClick={() => {
            type === 'minus' && quantity - 1 === 0 ? console.log('sdf') : console.log('sdf');
          }}
          disabled={false}
          className={clsx(styles.button)}
        >
          {type === 'plus' ? (
            <Image src={PlusIcon} className={styles.plusIcon} alt="plus" />
          ) : (
            <Image src={MinusIcon} className={styles.minusIcon} alt="minus" />
          )}
        </button>

        <AddToCart
          variants={product?.variants}
          availableForSale={product?.availableForSale}
          quantity={quantity}
        />
      </div>
    </>
  );
}
