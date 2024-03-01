import collectionFragment from './collection';
import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    vendor
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          unitPriceMeasurement {
            quantityUnit
            referenceUnit
            referenceValue
            measuredType
            quantityValue
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    collections(first: 5) {
      edges {
        node {
          ...collection
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
  ${collectionFragment}
`;

export default productFragment;
