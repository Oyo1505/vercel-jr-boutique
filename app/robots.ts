const baseUrl = process.env.DOMAIN_URL
  ? `https://${process.env.DOMAIN_URL}` :  process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      }
    ],
    sitemap: process.env.ENVIRONEMENT ==='production' && baseUrl === 'jr-boutique.fr' ?  `${baseUrl}/sitemap.xml`: null,
    host: process.env.ENVIRONEMENT ==='production' && baseUrl === 'jr-boutique.fr' ? baseUrl : null
  };
}
