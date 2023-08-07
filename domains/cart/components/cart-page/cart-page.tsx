'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import type { Cart } from 'lib/shopify/types';
import styles from './cart-page.module.scss';
import emptyPanier from '../../../../public/images/page-acceuil/Qualité.png';
import Price from 'domains/price';
import DeleteItemButton from '../delete-item-button/delete-item-button';
import EditItemQuantityButton from '../edit-item-quantity-button/edit-item-quantity-button';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';

type MerchandiseSearchParams = {
  [key: string]: string;
};

const CartPage = ({ cart, cartIdUpdated }: { cart: Cart; cartIdUpdated: boolean }) => {
  const [, setCookie] = useCookies(['cartId']);

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

  return (
    <div className={styles.container}>
      {cart.lines.length === 0 ? (
        <div className={styles.emptyCart}>
          <p className={styles.phrase}>Votre panier est actuellement vide</p>
          <Image src={emptyPanier} alt="empty-apnier" />
          <Link href={'/'} className={styles.link}>
            Retour à la boutique
          </Link>
        </div>
      ) : (
        <div className={styles.containerItems}>
          <ul className={styles.subContainerItems}>
            {cart.lines.map((item, i: number) => {
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
                  <Link className={styles.itemRow} href={merchandiseUrl}>
                    <div className={styles.imageContainer}>
                      <Image
                        className={styles.imageItem}
                        width={134}
                        height={134}
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
        </div>
      )}
    </div>
  );
};

export default CartPage;
