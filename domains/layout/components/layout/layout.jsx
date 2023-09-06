'use client';
import SearchbarContextContextProvider from 'domains/common/context/search-bar-context';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';

const Layout = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const code = searchParams.get('code');

  //useObtainAccessToken(code)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <SearchbarContextContextProvider>
        <Suspense fallback={null}>
          {children}
          <CookieConsent
            cookieName="CookieConsent"
            flipButtons
            expires={365}
            buttonText="J'accepte"
            declineButtonText="Je refuse"
            enableDeclineButton
          >
            Ce site web utilise des cookies pour améliorer l&aposexpérience utilisateur.
          </CookieConsent>
        </Suspense>
      </SearchbarContextContextProvider>
    </ReCaptchaProvider>
  );
};

export default Layout;
