import { Suspense } from 'react';
import Footer from '../../domains/common/footer/footer';
import styles from './layout.module.scss';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Suspense>
        <Suspense>{children}</Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
