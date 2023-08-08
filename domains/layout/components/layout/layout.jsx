'use client';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import CookieConsent from 'react-cookie-consent';
const Layout = ({ children }) => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  //useObtainAccessToken(code)

  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <Suspense fallback={null}>
        {children}
        <CookieConsent
          cookieName='CookieConsent'
          flipButtons
          expires={365}
          buttonText="J'accepte"
          declineButtonText='Je refuse'
          enableDeclineButton
        >
          Ce site web utilise des cookies pour améliorer l&aposexpérience utilisateur.
        </CookieConsent>
      </Suspense>
    </ReCaptchaProvider>
  );
};

export default Layout;
