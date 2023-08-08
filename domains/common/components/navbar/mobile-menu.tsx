'use client';
import clsx from 'clsx';
import CloseIcon from 'domains/icons/close';
import MenuIcon from 'domains/icons/menu';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CustomModal from '../custom-modal/custom-modal';
import styles from './mobile-menu.module.scss';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label='Open mobile menu'
        className={styles.OpenButton}
        data-testid='open-mobile-menu'
      >
        <MenuIcon />
      </button>
      <CustomModal openModal={isOpen} setIsOpen={setIsOpen} direction='left'>
        <div>
          <button
            onClick={closeMobileMenu}
            aria-label='Close mobile menu'
            data-testid='close-mobile-menu'
            className={styles.closeButton}
          >
            <CloseIcon />
          </button>

          {/* <div>
            <Search />
          </div> */}
          <ul className={styles.listItems}>
            {menu.length
              ? menu.map((item: Menu) => (
                  <li
                    key={item.title}
                    className={clsx(
                      item.title.toLocaleLowerCase().replace(' ', '_') === pathname.substring(1) &&
                        styles.isActive
                    )}
                  >
                    <Link href={item.path} onClick={closeMobileMenu}>
                      {item.title}
                    </Link>
                  </li>
                ))
              : null}
            <Link href={'/panier'}>Panier</Link>
          </ul>
        </div>
      </CustomModal>
    </>
  );
}
