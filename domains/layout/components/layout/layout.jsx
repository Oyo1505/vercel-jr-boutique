'use client';
import { useShopifyCookies } from '@shopify/hydrogen-react';
import SearchbarContextContextProvider from 'domains/common/context/search-bar-context';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import styles from './layout.module.scss';
const Layout = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [cookiesConstent, setCookiesConsent] = useState();
  const code = searchParams.get('code');

  //useObtainAccessToken(code)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useShopifyCookies({ hasUserConsent: cookiesConstent, domain: process.env.DOMAIN_URL });
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <SearchbarContextContextProvider>
        <Suspense fallback={null}>
          {children}
          <CookieConsent
            cookieName="jr-cookies-consent"
            flipButtons
            expires={365}
            buttonText="J'accepte"
            declineButtonText="Je refuse"
            enableDeclineButton
            onAccept={() => setCookiesConsent(true)}
          >
            Ce site web utilise des cookies pour améliorer l&apos;expérience utilisateur.{' '}
            <Link className={styles.politique} href={'/politique-de-confidentialite'}>
              Notre politique de confidentialite
            </Link>
          </CookieConsent>
        </Suspense>
      </SearchbarContextContextProvider>
    </ReCaptchaProvider>
  );
};

export default Layout;
