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

export default getCustomerMetafields;
