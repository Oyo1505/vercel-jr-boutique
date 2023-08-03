
import Cart from 'domains/cart/components/cart/cart';
import CartIcon from 'domains/icons/cart';
import { getMenu } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { isDesktop } from 'react-device-detect';
import headerLogo from '../../../../public/images/header/Header.png';
import logoLogin from '../../../../public/images/header/ProfilMenu.png';
import headerLogoSmall from '../../../../public/images/page-acceuil/miniLogo.png';
import Menu from './menu';
import MobileMenu from './mobile-menu';
import styles from './navbar.module.scss';

const Navbar = async () => {
  const menu = await getMenu('next-js-frontend-header-menu');
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return !isDesktop ? (
    <>
      <MobileMenu menu={menu} />
      <nav className={styles.container}>
        <Link href='/' className={styles.logo} aria-label='Logo'>
          <Image src={headerLogoSmall} alt='header-logo' />
        </Link>
      </nav>
    </>
  ) : (
    <>
      <nav className={styles.container}>
      <Link href='/' className={styles.logo} aria-label='Logo'>
          <Image src={headerLogo}  alt='header-logo' />
        </Link>
        <div className={styles.navBarMenu}>
         <Menu menu={menu} />
        </div>
        <div className={styles.asideContainer}>
          <div className={styles.logoReseau}>
            <a href='https://www.facebook.com/jrdistribution' />
            <a href='https://www.instagram.com/jrdistribution.particuliers' />
          </div>
          <div className={styles.menuProfil}>
            <Suspense fallback={<CartIcon />}>
              <Cart />
            </Suspense>
            <a href={'https://shopify.com/79699935512/account'}>
              <Image src={logoLogin} alt='profil' />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
