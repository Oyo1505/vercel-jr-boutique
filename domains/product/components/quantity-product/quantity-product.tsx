import { useMemo } from 'react';
import { AddToCart } from '../add-to-cart/add-to-cart';
import EditItemQuantityButtonProductPage from '../edit-item-quantity-button-product-page/edit-quantity-button';

const QuantityProduct = ({ product }) => {
  const quantity = useMemo(() => 1, []);
  return (
    <div>
      <div>
        <EditItemQuantityButtonProductPage item={product} type="plus" quantity={quantity} />
        <EditItemQuantityButtonProductPage item={product} type="minus" quantity={quantity} />
      </div>
      <AddToCart
        variants={product?.variant}
        availableForSale={product.availableForSale}
        quantity={quantity}
      />
    </div>
  );
};

export default QuantityProduct;
