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

export default getCustomerOders;
