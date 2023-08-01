import {
  generateCodeChallenge,
  generateCodeVerifier
} from 'domains/common/utilites/generate-code-verifier/generate-code-verifier';
import { useEffect, useState } from 'react';

const useAuthorizationRequest = (clientId:string | undefined, shopId:string, redirectUri:string, state:string |undefined, nonce:string) => {
  const [authorizationUrl, setAuthorizationUrl] = useState('');

  const handleAuthorization = async () => {
    const authorizationRequestUrl = new URL(`https://shopify.com/${shopId}/auth/oauth/authorize`);
    authorizationRequestUrl.searchParams.append(
      'scope',
      `openid email openid email https://api.customers.com/auth/customer.graphql`
    );
    authorizationRequestUrl.searchParams.append(
      'client_id',
      'shp_b3b29fa1-ef9e-4431-8e8b-1dbb95ec30c3'
    );
    authorizationRequestUrl.searchParams.append('response_type', 'code');
    authorizationRequestUrl.searchParams.append('redirect_uri', redirectUri);
    authorizationRequestUrl.searchParams.append('state', state ?? '');
    authorizationRequestUrl.searchParams.append('nonce', nonce);

    // Public Client
    const verifier = await generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('code-verifier', verifier);
    authorizationRequestUrl.searchParams.append('code_challenge', challenge);
    authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256');

    setAuthorizationUrl(authorizationRequestUrl.toString());
  };

  useEffect(() => {
    handleAuthorization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, shopId, redirectUri, state, nonce]);

  return authorizationUrl;
};

export default useAuthorizationRequest;
