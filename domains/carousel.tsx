import { getCollectionProducts } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'cheese' });

  if (!products?.length) return null;

  return (
    <div>
      <div>
        {[...products, ...products].map((product, i) => (
          <Link key={`${product.handle}${i}`} href={`/product/${product.handle}`}>
            {product.featuredImage ? (
              <Image alt={product.title} fill sizes="33vw" src={product.featuredImage.url} />
            ) : null}
            <div>
              <div>{product.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
