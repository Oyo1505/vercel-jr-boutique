const baseUrl = process.env.DOMAIN_URL
  ? `https://${process.env.DOMAIN_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default function robots() {
  return {
    rules: [
      process.env.ENVIRONEMENT !== 'production' &&
        baseUrl !== `https://${process.env.DOMAIN_URL}` && {
          userAgent: '*',
          allow: '/'
        }
    ],
    sitemap:
      process.env.ENVIRONEMENT === 'production' && baseUrl === `https://${process.env.DOMAIN_URL}`
        ? `${baseUrl}/sitemap.xml`
        : null,
    host:
      process.env.ENVIRONEMENT === 'production' && baseUrl === `https://${process.env.DOMAIN_URL}`
        ? baseUrl
        : null
  };
}
