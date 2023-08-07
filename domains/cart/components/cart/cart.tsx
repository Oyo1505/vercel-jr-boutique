import { createCart, getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import CartModal from '../modal/modal';

interface Props{
  pathname? : string
}

export default async function Cart({pathname}:Props) {
  
  const cartId = cookies().get('cartId')?.value;
  let cartIdUpdated = false;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  // If the `cartId` from the cookie is not set or the cart is empty
  // (old carts becomes `null` when you checkout), then get a new `cartId`
  //  and re-fetch the cart.
  if (!cartId || !cart) {
    cart = await createCart();
    cartIdUpdated = true;
  }

  return pathname ? 'COUCOUs' : <CartModal cart={cart} cartIdUpdated={cartIdUpdated} />;
}
