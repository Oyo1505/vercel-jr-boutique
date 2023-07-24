'use client';
import React, { Suspense } from 'react';
import createApp from '@shopify/app-bridge';
import styles from './layout.module.scss';

const Layout = ({ children }) => {
  // const config = {
  //     // The client ID provided for your application in the Partner Dashboard.
  //     apiKey: JSON.stringify(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
  //     // The host of the specific shop that's embedding your app. This value is provided by Shopify as a URL query parameter that's appended to your application URL when your app is loaded inside the Shopify admin.
  //     host: JSON.stringify(process.env.SHOPIFY_STORE_DOMAIN),
  //     forceRedirect: true
  // };
  // const app = createApp(config);
  // console.log(app)
  return (
    <div className={styles.layout}>
      <Suspense>
        <Suspense>{children}</Suspense>
      </Suspense>
    </div>
  );
};

export default Layout;
