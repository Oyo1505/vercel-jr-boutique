import Grid from 'domains/grid/components/grid';
import ProductGridItems from 'domains/layout/product-grid-items/product-grid-items';
import { Gallery } from 'domains/product/components/gallery/gallery';
import QuantityProduct from 'domains/product/components/quantity-product/quantity-product';
import { VariantSelector } from 'domains/product/components/variant-selector/variant-selector';
import Prose from 'domains/prose';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';
export const runtime = 'edge';

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
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: hide,
      follow: hide,
      googleBot: {
        index: hide,
        follow: hide
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
  //console.log(product)
  return (
    <div className={styles.container}>
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
          <h3 className={styles.title}>{product?.title}</h3>
          {product.descriptionHtml ? (
            <Prose html={product.descriptionHtml} className={styles.description} />
          ) : null}
        </div>
        <div className={styles.price}>160 € / Kilo</div>
      </div>
      <div className={styles.separateur}></div>
      {product?.variants?.length > 1 && (
        <>
          <div className={styles.variants}>
            <VariantSelector
              options={product.options}
              variants={product.variants}
              optionName={product?.options?.[0]?.name}
            />
            {/* {product?.variants?.unitPriceMeasurement && <div><span>Poid total : </span>{product?.variants?.unitPriceMeasurement?.quantityValue} kg</div>} */}
            <div className={styles.separateur} />
          </div>
        </>
      )}

      <div className={styles.priceVariant}>
        {product?.variants?.length > 0 && (
          <>
            {product?.variants?.[0]?.price?.amount} € <span className={styles.ttc}>TTC</span>
          </>
        )}
      </div>

      <QuantityProduct product={product} />
      {/* <Suspense>
        <RelatedProducts id={product.id} />
      </Suspense> */}
    </div>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div>
      <div>Related Products</div>
      <Grid>
        <ProductGridItems products={relatedProducts} />
      </Grid>
    </div>
  );
}
