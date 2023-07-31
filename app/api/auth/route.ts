import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// We always need to respond with a 200 status code to Shopify,
// otherwise it will continue to retry the request.
export async function POST(req: NextRequest): Promise<Response> {
  const body = new URLSearchParams();
  const { code, code_verifier } = await req.json();

  const clientId = process.env.SHOPIFY_HEADLESS_CODE_CLIENT ?? '';
  body.append('grant_type', 'authorization_code');
  body.append('client_id', clientId);
  body.append('redirect_uri', `https://ef50-91-200-207-60.ngrok-free.app`);
  body.append('code', code);
  body.append('code_verifier', code_verifier);
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic ' +
      btoa(
        process.env.SHOPIFY_HEADLESS_CODE_CLIENT +
          ':' +
          process.env.SHOPIFY_HEADLESS_CODE_CLIENT_SECRET
      )
  };

  const response = await axios(
    `https://shopify.com/${process.env.SHOPIFY_STORE_ID}/auth/oauth/token`,
    {
      method: 'POST',
      headers: headers,
      data: body
    }
  );
  const { access_token, expires_in, id_token, refresh_token } = await response.json();
  return NextResponse.json({
    msg: { access_token, expires_in, id_token, refresh_token },
    status: 200
  });
}
