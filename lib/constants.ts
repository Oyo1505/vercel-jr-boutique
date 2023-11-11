export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
  first?: number;
};

export const defaultSort: SortFilterItem = {
  title: 'Meilleur ventes',
  slug: 'trending-desc',
  sortKey: 'BEST_SELLING',
  reverse: false,
  first: 100
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Nouveautés', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Du moins cher au plus cher', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Du plus cher au moins cher', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  pages: 'pages'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
