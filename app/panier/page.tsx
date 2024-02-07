import CartPage from 'domains/cart/components/cart-page/cart-page';
import { createCart, getCart } from 'lib/shopify';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: process.env.DOMAIN_URL
      ? new URL(`https://${process.env.DOMAIN_URL}`)
      : new URL('http://localhost:3000'),

    title: 'Panier',
    description: 'Panier',
    verification: {
      google: 'google'
    },
    robots: {
      follow: true,
      index: true,
      googleBot: {
        follow: true,
        index: true
      }
    },
    alternates: {
      canonical: `/panier`
    }
  };
}

const PanierPage = async () => {
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

  return <CartPage cart={cart} cartIdUpdated={cartIdUpdated} />;
};

export default PanierPage;
