'use client';
import { Suspense } from 'react';
import styles from './layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Suspense>
        <Suspense>{children}</Suspense>
      </Suspense>
    </div>
  );
};

export default Layout;
