import axios from 'axios';

const useObtainAccessToken = async (code) => {
  const clientId = 'shp_89014235-8e2f-43a8-9484-9564d0b4cd97';
  const body = new URLSearchParams();

  body.append('grant_type', 'authorization_code');
  body.append('client_id', clientId);
  body.append('redirect_uri', `https://localhost:3000`);
  body.append('code', code);

  // Public Client
  const codeVerifier = localStorage.getItem('code-verifier');

  body.append('code_verifier', codeVerifier);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  };

  const response = await axios(`https://shopify.com/79699935512/auth/oauth/token`, {
    method: 'POST',
    headers: headers,
    data: body
  });

  console.log(response);
  interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
  }

  const { access_token, expires_in, id_token, refresh_token } = await response.json();

  return {
    access_token,
    expires_in,
    id_token,
    refresh_token
  };
};

export default useObtainAccessToken;
