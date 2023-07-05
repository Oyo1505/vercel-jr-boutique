'use client';
import { useRouter } from 'next/navigation';
import { addItem } from '../actions';

const useAddToCart = (variantId: string) => {
  const router = useRouter();
  const addToCart = async () => {
    const error = await addItem(variantId);

    if (error) {
      alert(error);
      return;
    }

    router.refresh();
  };
  return { addToCart };
};

export default useAddToCart;
