import { Suspense } from 'react';
import Loading from './loadings';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
