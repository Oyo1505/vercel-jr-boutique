import { useEffect, useState } from 'react';
interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}
const useObtainAccessToken =  (code: string) => {
  const [data, setData] = useState<AccessTokenResponse>()
  const clientId = 'shp_89014235-8e2f-43a8-9484-9564d0b4cd97';

  useEffect(()=> {
   const x = async () => {
    const body = new URLSearchParams();

    body.append('grant_type', 'authorization_code');
    body.append('client_id', clientId);
    body.append('redirect_uri', `https://8e72-86-246-133-16.ngrok-free.app`);
    body.append('code', code);
  
    // Public Client
    const codeVerifier = localStorage.getItem('code-verifier');
    
    body.append('code_verifier', codeVerifier ?? '');
  
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    };
    const response = await fetch(`https://shopify.com/79699935512/auth/oauth/token`, {
      method: 'POST',
      headers: headers,
      body
    });
    const data = await response.json();
    console.log(code)
    setData(data)
   }
 
    if(code?.length > 0) x()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    data
  };
};

export default useObtainAccessToken;
