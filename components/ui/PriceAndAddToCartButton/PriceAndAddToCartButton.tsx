import Image from 'next/image';
import { FC } from 'react';
import panierLogo from '../../../public/assets/images/diver/AjouterPanier.png';
import useAddToCart from '../../product/hooks/addToCart';
import IProductShopify from '../../product/product.model';
import styles from './PriceAndAddToCartButton.module.scss';

interface Props {
  product: IProductShopify;
}

const PriceAndAddToCartButton: FC<Props> = ({ product }) => {
  const { addToCart } = useAddToCart({ product });
  return (
    <div className={styles.container}>
      <div className={styles.value}>
        <span>{product?.price?.value}</span>
        <span> €</span>
      </div>
      <div>
        <div onClick={addToCart}>
          <Image src={panierLogo} alt="panierLogo" />
        </div>
      </div>
    </div>
  );
};

export default PriceAndAddToCartButton;
