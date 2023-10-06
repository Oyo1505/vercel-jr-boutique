'use client';
import styles from './floating-button-cart.module.scss';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { Cart } from 'lib/shopify/types';
import Link from 'next/link';
import CartFloating from 'domains/icons/cart-floating';

const FloatingButtonCart = ({ cart, cartIdUpdated }: { cart: Cart; cartIdUpdated: boolean }) => {
  const pathname = usePathname();
  const [, setCookie] = useCookies(['cartId']);
  const quantityRef = useRef(cart.totalQuantity);

  useEffect(() => {
    if (cartIdUpdated) {
      setCookie('cartId', cart.id, {
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
    }
    return;
  }, [setCookie, cartIdUpdated, cart.id]);

  useEffect(() => {
    // Open cart modal when when quantity changes.
    if (cart.totalQuantity !== quantityRef.current && pathname !== '/panier') {
      // But only if it's not already open (quantity also changes when editing items in cart).

      // Always update the quantity reference
      quantityRef.current = cart.totalQuantity;
    }
  }, [cart.totalQuantity, quantityRef, pathname]);

  return (
    cart?.totalQuantity > 0 && (
      <Link href={'/panier'}>
        <div className={styles.container}>
          <div className={styles.subContainer}>
            <CartFloating className={styles.floating} />
            <div className={styles.quantity}>{cart.totalQuantity}</div>
          </div>
        </div>
      </Link>
    )
  );
};

export default FloatingButtonCart;
