'use client';

import { Dialog, Transition } from '@headlessui/react';
import CartIcon from 'domains/icons/cart';
import CloseIcon from 'domains/icons/close';
import ShoppingBagIcon from 'domains/icons/shopping-bag';
import Price from 'domains/price';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import EditItemQuantityButton from '../../edit-item-quantity-button';
import DeleteItemButton from '../delete-item-button/delete-item-button';
import styles from './modal.module.scss';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart, cartIdUpdated }: { cart: Cart; cartIdUpdated: boolean }) {
  const [, setCookie] = useCookies(['cartId']);
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

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
    if (cart.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart.totalQuantity;
    }
  }, [isOpen, cart.totalQuantity, quantityRef]);

  return (
    <>
      <button
        aria-label="Open cart"
        onClick={openCart}
        className={styles.button}
        data-testid="open-cart"
      >
        <CartIcon quantity={cart.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className={styles.dialog} data-testid="cart">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className={styles.childTransition} aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className={styles.dialogPanel}>
              <div className={styles.dialogContainer}>
                <p className={styles.title}>Mon Panier</p>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  data-testid="close-cart"
                  className={styles.closeButton}
                >
                  <CloseIcon className={styles.closeIcon} />
                </button>
              </div>

              {cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingBagIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="flex-grow overflow-auto p-6">
                    {cart.lines.map((item, i) => {
                      const merchandiseSearchParams = {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      });

                      const merchandiseUrl = createUrl(
                        `/product/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <li key={i} data-testid="cart-item" className={styles.cartItem}>
                          <Link
                            className={styles.itemRow}
                            href={merchandiseUrl}
                            onClick={closeCart}
                          >
                            <div className={styles.imageContainer}>
                              <Image
                                className={styles.imageModal}
                                width={64}
                                height={64}
                                alt={
                                  item.merchandise.product.featuredImage.altText ||
                                  item.merchandise.product.title
                                }
                                src={item.merchandise.product.featuredImage.url}
                              />
                            </div>
                            <div className={styles.titleProduct}>
                              <span>{item.merchandise.product.title}</span>
                              {item.merchandise.title !== DEFAULT_OPTION ? (
                                <p data-testid="cart-product-variant">{item.merchandise.title}</p>
                              ) : null}
                            </div>
                            <Price
                              amount={item.cost.totalAmount.amount}
                              currencyCode={item.cost.totalAmount.currencyCode}
                            />
                          </Link>
                          <div className={styles.buttonRow}>
                            <DeleteItemButton item={item} />
                            <p>
                              <span className="w-full px-2">{item.quantity}</span>
                            </p>
                            <EditItemQuantityButton item={item} type="minus" />
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className={styles.totalShippingContainer}>
                    <div className={styles.totalContainer}>
                      <p className={styles.total}>Total produits :</p>
                      <Price
                        className={styles.total}
                        amount={cart.cost.subtotalAmount.amount}
                        currencyCode={cart.cost.subtotalAmount.currencyCode}
                      />
                    </div>
                    <div className={styles.totalContainer}>
                      <p className={styles.total}>Frais de livraison :</p>
                      <p className={styles.total}>14 €</p>
                    </div>
                  </div>
                  <a href={cart.checkoutUrl} className={styles.checkout}>
                    <span>Procédé au paiement</span>
                  </a>
                  <a href={cart.checkoutUrl} className={styles.panier}>
                    <span>Aller au panier</span>
                  </a>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
