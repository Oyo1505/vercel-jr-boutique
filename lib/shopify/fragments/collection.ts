const collectionFragment = /* GraphQL */ `
  fragment collection on Collection {
    handle
    title
    description
    seo {
      ...seo
    }
    updatedAt
  }
`;

export default collectionFragment;
