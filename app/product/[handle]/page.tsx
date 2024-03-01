import ProductGridItems from 'domains/layout/components/product-grid-items/product-grid-items';
import { Gallery } from 'domains/product/components/gallery/gallery';
import PriceProductPage from 'domains/product/components/price-product-page/price-product-page';
import PriceBySize from 'domains/product/components/priceBySize/price-by-size';
import QuantityProduct from 'domains/product/components/quantity-product/quantity-product';
import { VariantSelector } from 'domains/product/components/variant-selector/variant-selector';
import Prose from 'domains/prose';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { capitalizeFirstLetter } from 'shared/utilities/capitalize-first-letter/capitaliaze-first-letter';
import Loading from '../../../domains/ui/loading/loading';
import styles from './page.module.scss';
import Ariane from 'domains/layout/components/ariane/ariane';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const hide = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    metadataBase: new URL(`https://www.jr-boutique.fr`),
    title: capitalizeFirstLetter(product.seo.title || product.title).replace('_', ' '),
    description: product.seo.description || product.description,
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo'
    },
    alternates: {
      canonical: `/product/${product.handle}`
    },
    robots: {
      follow: true,
      index: true,
      googleBot: {
        follow: true,
        index: true
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return product ? (
    <div className={styles.container}>
      <Ariane
        collection={product?.collections?.edges[0]?.node?.seo?.title}
        produit={product.title}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <Gallery
        title={product.title}
        amount={product.priceRange.maxVariantPrice.amount}
        currencyCode={product.priceRange.maxVariantPrice.currencyCode}
        images={product.images.map((image: Image) => ({
          src: image.url,
          altText: image.altText
        }))}
      />
      <div className={styles.infoProduct}>
        <div className={styles.descriptionProduct}>
          <h1 className={styles.title}>{product?.title}</h1>
          <h2 className={styles.fournisseur}>{product?.vendor}</h2>
          {product.descriptionHtml ? (
            <Prose html={product.descriptionHtml} className={styles.description} />
          ) : null}
        </div>
        <div className={styles.price}>
          <PriceBySize product={product} />
        </div>
      </div>
      <div className={styles.separateur}></div>
      {product?.variants?.length > 1 && (
        <>
          <div className={styles.variants}>
            <VariantSelector options={product.options} variants={product.variants} />
          </div>
        </>
      )}

      <div className={styles.priceVariant}>
        <PriceProductPage product={product} />
      </div>

      <QuantityProduct product={product} />
      <Suspense>
        <RelatedProducts id={product.id} />
      </Suspense>
    </div>
  ) : (
    <Loading />
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div>
      <div className={styles.produitRelatedTitle}>Produits associés</div>
      <ul className={styles.produitRelated}>
        <ProductGridItems products={relatedProducts} limit={2} />
      </ul>
    </div>
  );
}
