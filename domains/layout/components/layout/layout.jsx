'use client';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Layout = ({ children }) => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  //useObtainAccessToken(code)

  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <Suspense fallback={null}>{children}</Suspense>
    </ReCaptchaProvider>
  );
};

export default Layout;
