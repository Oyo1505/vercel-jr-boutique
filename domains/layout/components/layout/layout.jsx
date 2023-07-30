'use client';
import useObtainAccessToken from 'domains/auth/hooks/use-obtain-access-token';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Layout = ({ children }) => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useObtainAccessToken(code)
  //console.log(data)
  return <Suspense fallback={null}>{children}</Suspense>;
};

export default Layout;
