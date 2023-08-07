'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './menu.module.scss';
const Menu = ({ menu }: any) => {
  const pathname = usePathname();
  //const {belowSm} = useBreakpoints()

  return menu.length ? (
    <>
      <ul className={styles.menuItems}>
        {menu.map((l: any) => (
          <>
            <li
              className={clsx(
                l.title.toLocaleLowerCase().replace(' ', '_') === pathname.substring(1) &&
                  styles.isActive
              )}
            >
              <Link href={l.path} key={l.path} className={styles.link}>
                {l.title}
              </Link>
              <span className={styles.slash}> </span>
            </li>
          </>
        ))}
        <li className={clsx(styles.link, pathname.substring(1) === 'contact' && styles.isActive)}>
          <Link href={'/contact'}>Contact</Link>
        </li>
        {/* <li>
                <button className={styles.button}>
                  {' '}
                  <SearchIcon className={styles.loupe} />
                </button>
              </li> */}
      </ul>
    </>
  ) : null;
};

export default Menu;
