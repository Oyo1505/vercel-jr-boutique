import { useState } from 'react';
import { useUI } from '../../ui/context';
import IProductShopify from '../product.model';

interface Props {
  product: IProductShopify;
}

const useAddToCart = ({ product }: Props) => {
  const { openSidebar, setSidebarView } = useUI();
  const [, setLoading] = useState(false);
  const [, setError] = useState<null | Error>(null);
  // const [, setSelectedOptions] = useState<SelectedOptions>({});

  const addToCart = async () => {
    setLoading(true);
    setError(null);
    try {
      setSidebarView('CART_VIEW');
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        console.error(err);
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.'
        });
      }
    }
  };
  return { addToCart };
};

export default useAddToCart;
