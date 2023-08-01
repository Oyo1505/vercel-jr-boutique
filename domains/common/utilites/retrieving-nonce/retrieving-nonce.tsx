export async function getNonce(token: string) {
  return decodeJwt(token).payload.nonce;
}
export function decodeJwt(token: string) {
  const [header, payload, signature] = token.split('.') as any;

  const decodedHeader = JSON.parse(atob(header));
  const decodedPayload = JSON.parse(atob(payload));

  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature
  };
}
