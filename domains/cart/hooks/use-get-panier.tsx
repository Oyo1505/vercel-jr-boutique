import { createCart, getCart } from 'lib/shopify';
import { cookies } from 'next/headers';

const useGetPanier = async () => {
  const cartId = cookies().get('cartId')?.value;
  let cartIdUpdated = false;
  let cart;

  const getCartFromShopify = async (cartId: string) => {
    cart = await getCart(cartId);
  };
  if (cartId) {
    await getCartFromShopify(cartId);
  }
  // If the `cartId` from the cookie is not set or the cart is empty
  // (old carts becomes `null` when you checkout), then get a new `cartId`
  //  and re-fetch the cart.
  const createCartFromShopify = async () => {
    cart = await createCart();
    cartIdUpdated = true;
  };
  if (!cartId || !cart) {
    await createCartFromShopify();
  }

  return { cart, cartIdUpdated };
};

export default useGetPanier;
