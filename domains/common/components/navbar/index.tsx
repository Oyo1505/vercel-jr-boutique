import Cart from 'domains/cart/components/cart/cart';
import CartIcon from 'domains/icons/cart';
import SearchIcon from 'domains/icons/search';
import { getMenu } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import headerLogo from '../../../../public/images/header/Header.png';
import logoLogin from '../../../../public/images/header/ProfilMenu.png';
import styles from './navbar.module.scss';
const Navbar = async () => {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.logo} aria-label="Logo">
        <Image src={headerLogo} alt="header-logo" />
      </Link>
      <div className={styles.navBarMenu}>
        {menu.length ? (
          <>
            <ul className={styles.menuItems}>
              {menu.map((l: any) => (
                <>
                  <li>
                    <Link href={l.path} key={l.path} className={styles.link}>
                      {l.title}
                    </Link>
                    <span className={styles.slash}> </span>
                  </li>
                </>
              ))}
              <li>
                <Link className={styles.link} href={'contact'}>
                  Contact
                </Link>
              </li>
              <li>
                <button className={styles.button}>
                  {' '}
                  <SearchIcon className={styles.loupe} />
                </button>
              </li>
            </ul>
          </>
        ) : null}
      </div>
      <div className={styles.asideContainer}>
        <div className={styles.logoReseau}>
          <a href="https://www.facebook.com/jrdistribution" />
          <a href="https://www.instagram.com/jrdistribution.particuliers" />
        </div>
        <div className={styles.menuProfil}>
          <Suspense fallback={<CartIcon />}>
            <Cart />
          </Suspense>
          <Link href={'/espace-personnel'}>
            <Image src={logoLogin} alt="profil" />
          </Link>
        </div>
      </div>

      {/* <div>
        <Suspense fallback={<CartIcon />}>
          <Cart />
        </Suspense>
      </div> */}
    </nav>
  );
};

export default Navbar;
