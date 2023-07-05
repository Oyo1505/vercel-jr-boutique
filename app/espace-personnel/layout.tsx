import { Suspense } from 'react';
import Footer from '../../domains/common/footer/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div>
        <Suspense>{children}</Suspense>
      </div>
      <Footer />
    </Suspense>
  );
}
