'use client';
import { Product } from 'lib/shopify/types';
import { FC, useState } from 'react';
import { AddToCart } from '../add-to-cart/add-to-cart';
import EditItemQuantityButtonProductPage from '../edit-item-quantity-button-product-page/edit-quantity-button';
import styles from './quantity-product.module.scss';
interface Props {
  product: Product;
}

const QuantityProduct: FC<Props> = ({ product }) => {
  const [count, setCount] = useState(1);
  return (
    <div className={styles.container}>
      <div className={styles.countEdit}>
        <div className={styles.count}>{count}</div>
        <div>
          <EditItemQuantityButtonProductPage type="plus" quantity={count} setCount={setCount} />
          <EditItemQuantityButtonProductPage type="minus" quantity={count} setCount={setCount} />
        </div>
      </div>
      <AddToCart
        variants={product?.variants}
        availableForSale={product.availableForSale}
        quantity={count}
      />
    </div>
  );
};

export default QuantityProduct;
