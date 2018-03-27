import gql from 'graphql-tag';

const favoriteStatus = gql`
  mutation favoriteStatus($id: ID!) {
    favoriteStatus(id: $id) {
      id
      codeCIS
      denomination
      status
    }
  }
`;

export default favoriteStatus;
