import { Suspense } from 'react';
import styles from './layout.module.scss';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Suspense>
        <Suspense>{children}</Suspense>
      </Suspense>
    </div>
  );
}
