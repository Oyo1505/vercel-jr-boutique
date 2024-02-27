import Cart from 'domains/cart/components/cart/cart';
import CartIcon from 'domains/icons/cart';
import { getMenu } from 'lib/shopify';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import headerLogo from '../../../../public/images/header/header.webp';
import logoLogin from '../../../../public/images/header/ProfilMenu.webp';
import headerLogoSmall from '../../../../public/images/page-acceuil/miniLogo.png';
import SearchNavbarButton from '../search-navbar-button/search-navbar-button';
import Menu from './menu';
import MobileMenu from './mobile-menu';
import styles from './navbar.module.scss';
import Search from './search';

const Navbar = async () => {
  const menu = await getMenu('next-js-frontend-header-menu');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const headersList = headers();

  const userAgent = headersList.get('user-agent');
  const isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return isMobileView ? (
    <>
      <MobileMenu menu={menu} />
      <nav className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Logo">
          <Image src={headerLogoSmall} alt="header-logo" priority quality={100} />
        </Link>
      </nav>
    </>
  ) : (
    <>
      <nav className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Logo">
          <Image
            src={headerLogo}
            alt="header-logo"
            priority
            unoptimized
            placeholder="blur"
            sizes="100vw"
            quality={100}
          />
        </Link>
        <div className={styles.navBarMenu}>
          <Menu menu={menu} />
        </div>
        <div className={styles.asideContainer}>
          <div className={styles.logoReseau}>
            <a href="https://www.facebook.com/jrdistribution" aria-label="Facebook" />
            <a
              href="https://www.instagram.com/jrdistribution.particuliers"
              aria-label="instagram"
            />
          </div>
          <div className={styles.menuProfil}>
            <Suspense fallback={<CartIcon />}>
              <Cart />
            </Suspense>
            <a href={'https://shopify.com/79699935512/account'}>
              <Image src={logoLogin} alt="profil" />
            </a>
            <SearchNavbarButton />
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};

export default Navbar;
