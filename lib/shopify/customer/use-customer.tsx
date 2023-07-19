import useCustomer, { type UseCustomer } from '@vercel/commerce/customer/use-customer';

import getCustomerQuery from '../queries/get-customer-query';
import { getCustomerToken } from '../utils/customer-token';

export default useCustomer as UseCustomer<typeof handler>;

export const handler = {
  fetchOptions: {
    query: getCustomerQuery
  },
  async fetcher({ options, fetch }) {
    const customerAccessToken = getCustomerToken();

    if (customerAccessToken) {
      const { customer } = await fetch({
        ...options,
        variables: { customerAccessToken: getCustomerToken() }
      });

      if (!customer) {
        return null;
      }

      return {
        id: customer.id,
        firstName: customer.firstName ?? 'N/A',
        lastName: customer.lastName ?? '',
        ...(customer.email && { email: customer.email }),
        ...(customer.phone && { phone: customer.phone })
      };
    }
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions
        }
      });
    }
};
