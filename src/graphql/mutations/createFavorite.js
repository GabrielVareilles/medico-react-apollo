import gql from 'graphql-tag';

const createFavorite = gql`
  mutation createFavorite($codeCIS: String!, $denomination: String!) {
    createFavorite(codeCIS: $codeCIS, denomination: $denomination) {
      id
      codeCIS
      denomination
      status
    }
  }
`;

export default createFavorite;
