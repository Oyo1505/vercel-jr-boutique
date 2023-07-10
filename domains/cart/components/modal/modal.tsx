'use client';
import { useOnClickOutside } from 'domains/common/hooks/use-on-click-outside';
import CartIcon from 'domains/icons/cart';
import CloseIcon from 'domains/icons/close';
import Price from 'domains/price';
import Button from 'domains/ui/button/button';
import { motion } from 'framer-motion';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FC, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { createPortal } from 'react-dom';
import emptyPanier from '../../../../public/images/page-acceuil/Qualité.png';
import DeleteItemButton from '../delete-item-button/delete-item-button';
import EditItemQuantityButton from '../edit-item-quantity-button/edit-item-quantity-button';
import styles from './modal.module.scss';

type MerchandiseSearchParams = {
  [key: string]: string;
};

interface Props {
  children: ReactNode;
  openModal: boolean;
  closeOnClickOutside?: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const CustomModal: FC<Props> = ({ children, openModal, closeOnClickOutside = true, setIsOpen }) => {
  const ref = useRef<Element | null>(null);
  const modalRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [mounted, setMounted] = useState(false);

  useOnClickOutside(modalRef, () => {
    if (closeOnClickOutside) setIsOpen(false);
  });
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal');
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <motion.div
          ref={modalRef}
          transition={{ duration: 0.2, delay: 0.1 }}
          initial={{ opacity: 0 }}
          animate={{ right: openModal ? 0 : -700, opacity: openModal ? 1 : 0 }}
          className={styles.dialog}
        >
          {children}
        </motion.div>,
        ref.current
      )
    : null;
};

export default function CartModal({ cart, cartIdUpdated }: { cart: Cart; cartIdUpdated: boolean }) {
  const [, setCookie] = useCookies(['cartId']);
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  console.log(isOpen);
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
      <CustomModal openModal={isOpen} setIsOpen={setIsOpen}>
        <div className={styles.dialogPanel} data-testid="cart">
          <div className={styles.dialogContainer}>
            <p className={styles.title}>Mon Panier</p>
            <button
              aria-label="Close cart"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="close-cart"
              className={styles.closeButton}
            >
              <CloseIcon className={styles.closeIcon} />
            </button>
          </div>

          {cart.lines.length === 0 ? (
            <div className={styles.emptyCart}>
              <p className={styles.phrase}>Votre panier est actuellement vide</p>
              <Image src={emptyPanier} alt="empty-apnier" />
              <Link href={'/'}>
                <Button text="Retour à la boutique" onClick={() => setIsOpen(false)} />
              </Link>
            </div>
          ) : (
            <div className={styles.containerItems}>
              <ul className={styles.subContainerItems}>
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
                      <Link className={styles.itemRow} href={merchandiseUrl} onClick={closeCart}>
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
                        <div className={styles.titleProduct}>{item.merchandise.product.title}</div>
                      </Link>
                      <div className={styles.buttonRow}>
                        <DeleteItemButton item={item} />
                        <div className={styles.variantItem}>
                          {item.merchandise.title !== DEFAULT_OPTION ? (
                            <p data-testid="cart-product-variant">{item.merchandise.title}</p>
                          ) : null}
                        </div>
                        <div className={styles.quantity}>
                          <span>X {item.quantity}</span>
                        </div>
                        <div className={styles.itemsButtonsQuantity}>
                          <EditItemQuantityButton item={item} type="plus" />
                          <EditItemQuantityButton item={item} type="minus" />
                        </div>
                      </div>
                      <div className={styles.price}>
                        <Price
                          className={styles.amount}
                          amount={item.cost.totalAmount.amount}
                          currencyCode={item.cost.totalAmount.currencyCode}
                        />
                        <span className={styles.colorText}>TTC</span>
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
                  <span className={styles.colorText}>TTC</span>
                </div>
              </div>
              <a href={cart.checkoutUrl} className={styles.checkout}>
                <span>Valider ma commande</span>
              </a>
              <a href={cart.checkoutUrl} className={styles.panier}>
                <span>Aller au panier</span>
              </a>
            </div>
          )}
        </div>
      </CustomModal>
      {isOpen && <div className={styles.childTransition} />}
    </>
  );
}
