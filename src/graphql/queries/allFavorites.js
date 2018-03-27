import gql from 'graphql-tag';

const allFavorites = gql`
  query allFavorites {
    allFavorites {
      id
      codeCIS
      denomination
      status
    }
  }
`;

export default allFavorites;
