'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './menu.module.scss';
import { Rubik } from 'next/font/google';

const rubik = Rubik({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

const Menu = ({ menu }: any) => {
  const pathname = usePathname();

  return menu.length ? (
    <>
      <ul className={clsx(styles.menuItems, rubik.className)}>
        {menu.map((l: any, i: number) => (
          <li
            key={`list-${l.path}-${i}`}
            className={clsx(
              l.title.toLocaleLowerCase().replace(' ', '_') === pathname.substring(1) &&
                styles.isActive
            )}
          >
            <Link href={l.path} className={styles.link}>
              {l.title}
            </Link>
            <span className={styles.slash}> </span>
          </li>
        ))}
        <li
          key={'contact'}
          className={clsx(styles.link, pathname.substring(1) === 'contact' && styles.isActive)}
        >
          <Link href={'/contact'}>Contact</Link>
        </li>
      </ul>
    </>
  ) : null;
};

export default Menu;
