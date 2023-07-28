import {
  generateCodeChallenge,
  generateCodeVerifier
} from 'domains/common/utilites/generate-code-verifier/generate-code-verifier';
import { useEffect, useState } from 'react';

const useAuthorizationRequest = (clientId, shopId, redirectUri, state, nonce) => {
  const [authorizationUrl, setAuthorizationUrl] = useState('');

  const handleAuthorization = async () => {
    const authorizationRequestUrl = new URL(`https://shopify.com/${shopId}/auth/oauth/authorize`);
    authorizationRequestUrl.searchParams.append(
      'scope',
      `openid email openid email https://api.customers.com/auth/customer.graphql`
    );
    authorizationRequestUrl.searchParams.append(
      'client_id',
      'shp_89014235-8e2f-43a8-9484-9564d0b4cd97'
    );
    authorizationRequestUrl.searchParams.append('response_type', 'code');
    authorizationRequestUrl.searchParams.append('redirect_uri', redirectUri);
    authorizationRequestUrl.searchParams.append('state', state);
    authorizationRequestUrl.searchParams.append('nonce', nonce);

    // Public Client
    const verifier = await generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('code-verifier', verifier);
    authorizationRequestUrl.searchParams.append('code_challenge', challenge);
    authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256');

    setAuthorizationUrl(authorizationRequestUrl.toString());
    console.log(authorizationRequestUrl);
  };

  useEffect(() => {
    handleAuthorization();
  }, [clientId, shopId, redirectUri, state, nonce]);

  return authorizationUrl;
};

export default useAuthorizationRequest;
