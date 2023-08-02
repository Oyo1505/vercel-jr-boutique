import axios from 'axios';
import { useEffect, useState } from 'react';
interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}
const useObtainAccessToken = (code: string) => {
  const [data, setData] = useState<AccessTokenResponse>();

  useEffect(() => {
    const x = async () => {
      // Public Client
      const code_verifier = localStorage.getItem('code-verifier');
      const response = await axios({
        url: `/api/auth`,
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        data: { code_verifier, code }
      });
      //const data = await response.json();

      setData(data);
    };
    if (code?.length > 0) x();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return {
    data
  };
};

export default useObtainAccessToken;
