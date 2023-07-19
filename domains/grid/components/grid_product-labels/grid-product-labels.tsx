// eslint-disable-next-line unicorn/filename-case
'use-client';
import clsx from 'clsx';
import useAddToCart from 'domains/cart/hooks/add-to-cart';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import logo from '../../../../public/images/diver/AjouterPanier.png';
import styles from './grid-product-labels.module.scss';
interface Props {
  product: any;
}

const GridProductLabels: FC<Props> = ({ product }) => {
  const { addToCart } = useAddToCart(product?.variants?.[0]?.id);
  const pathname = usePathname();
  const isPromo =
    product?.tags?.find((tag: string): boolean => tag === 'promotions') &&
    pathname !== '/promotions';

  return product ? (
    <div>
      <h3 data-testid="product-name" className={styles.title}>
        {product.title}
      </h3>
      <div className={styles.containerPrice}>
        <div className={clsx(styles.price, isPromo && styles.promo)}>
          {parseFloat(product.priceRange.minVariantPrice.amount)} €
        </div>
        <button className={styles.buttonAddToCart} onClick={addToCart}>
          {' '}
          <Image src={logo} alt="panier-ajout" />{' '}
        </button>
      </div>
    </div>
  ) : null;
};

export default GridProductLabels;
