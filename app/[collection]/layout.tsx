import { Suspense } from 'react';
import styles from './layout.module.scss';
import Loading from './loadings';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.layout}>{children}</div>
    </Suspense>
  );
}
