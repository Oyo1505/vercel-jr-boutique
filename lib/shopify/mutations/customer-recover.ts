const customerRecover = /* GraphQL */ `
  mutation recoverCustomerAccount($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export default customerRecover;
