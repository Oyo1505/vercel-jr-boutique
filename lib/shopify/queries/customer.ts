export const getCustomerQueryById = /* GraphQL */ `
  query getCustomerId($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
    }
  }
`;

export const getCustomerMetafields = /* GraphQL */ `
  query CustomerMetafields(
    $customerAccessToken: String!
    $identifiers: [HasMetafieldsIdentifier!]!
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      metafields(identifiers: $identifiers) {
        id
        key
        value
        namespace
        type
      }
    }
  }
`;

export const getCustomerOders = /* GraphQL */ `
  query getCustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      orders(first: 3) {
        edges {
          node {
            orderNumber
          }
        }
      }
    }
  }
`;

export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      tags
      acceptsMarketing
      createdAt
    }
  }
`;
