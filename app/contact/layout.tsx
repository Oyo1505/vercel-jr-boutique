import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <>
        <Suspense>{children}</Suspense>
      </>
    </Suspense>
  );
}
