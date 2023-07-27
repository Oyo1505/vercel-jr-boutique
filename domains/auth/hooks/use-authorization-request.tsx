import { useEffect, useState } from 'react';

const useAuthorizationRequest = (clientId, shopId, redirectUri, state, nonce) => {
  const [authorizationUrl, setAuthorizationUrl] = useState('');
  function dec2hex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
  }
function generateCodeVerifier() {
  var array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}
function sha256(plain) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a) {
  var str = "";
  var bytes = new Uint8Array(a);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallenge(verifier) {
  var hashed = await sha256(verifier);
  var base64encoded = base64urlencode(hashed);
  return base64encoded;
}

const handleAuthorization = async () => {
  const authorizationRequestUrl = new URL(
    `https://shopify.com/${shopId}/auth/oauth/authorize`
  );
  authorizationRequestUrl.searchParams.append(
    'scope',
    `openid email openid email https://api.customers.com/auth/customer.graphql`
  );
  authorizationRequestUrl.searchParams.append('client_id', 'shp_8025ff0c-189e-47b2-83c2-0d6d556a275b');
  authorizationRequestUrl.searchParams.append('response_type', 'code');
  authorizationRequestUrl.searchParams.append('redirect_uri', redirectUri);
  authorizationRequestUrl.searchParams.append('state', state);
  authorizationRequestUrl.searchParams.append('nonce', nonce);

  // Public Client
  const verifier = await generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem('code-verifier', verifier);
  authorizationRequestUrl.searchParams.append('code_challenge', challenge);
  authorizationRequestUrl.searchParams.append(
    'code_challenge_method',
    'S256'
  );

  setAuthorizationUrl(authorizationRequestUrl.toString());
};

  useEffect(() => {
   

    handleAuthorization();
  }, [clientId, shopId, redirectUri, state, nonce]);

  return authorizationUrl;
};

export default useAuthorizationRequest;