import gql from 'graphql-tag';

const destroyFavorite = gql`
  mutation destroyFavorite($id: ID!) {
    destroyFavorite(id: $id) {
      id
      codeCIS
      denomination
      status
    }
  }
`;

export default destroyFavorite;
