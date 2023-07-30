'use client';
import useObtainAccessToken from 'domains/auth/hooks/use-obtain-access-token';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
const Layout = ({ children }) => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useObtainAccessToken(code)
  //console.log(data)
  return <Suspense fallback={null}>
    <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
    >
      {children}
    </GoogleReCaptchaProvider>
  </Suspense>;
};

export default Layout;
