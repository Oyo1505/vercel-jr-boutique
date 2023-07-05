import Footer from 'domains/common/footer/footer';
import { Suspense } from 'react';

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
