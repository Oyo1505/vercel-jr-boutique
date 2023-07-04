import Cart from 'components/cart';
import CartIcon from 'components/icons/cart';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import headerLogo from '../../../public/images/header/Header.png';
import MobileMenu from './mobile-menu';
import styles from './navbar.module.scss';
export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.logo} aria-label="Logo">
        <Image src={headerLogo} alt="header-logo" />
      </Link>
      <div>
        <MobileMenu menu={menu} />
      </div>
      <div>
        {menu.length ? (
          <ul>
            {menu.map((item: Menu) => (
              <li key={item.title} className={styles.link}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
            <li>
              <Link className={styles.link} href={'contact'}>
                Contact
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
      {/* <div><Search /></div> */}

      <div>
        <Suspense fallback={<CartIcon />}>
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
}
