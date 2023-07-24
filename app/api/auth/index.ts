import { default as createShopifyAuth } from '@shopify/koa-shopify-auth';
import { verifyRequest } from '@shopify/koa-shopify-auth';
import { Session } from 'next-session';
import { ApiVersion } from '@shopify/app-bridge';
import withSession from '../../../middleware';

export const config = {
  api: {
    bodyParser: false
  }
};

const shopifyAuth = createShopifyAuth({
  apiKey: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  secret: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN_SECRET,
  scopes: ['read_products'], // Ajoutez ici les permissions dont votre application a besoin
  afterAuth(ctx) {
    const { shop, accessToken } = ctx.session;
    ctx.redirect('/');
  }
});

export default shopifyAuth;

export const getSession = (req) => {
  return new Promise((resolve, reject) => {
    Session().start(req, {}, () => {
      resolve(req.session);
    });
  });
};

export const middleware = async (req, res) => {
  const session = await getSession(req);
  console.log(session, 'DSQDL?QSD?D');
  try {
    await shopifyAuth(req, res);
    await verifyRequest();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
};
