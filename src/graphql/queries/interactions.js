import gql from 'graphql-tag';

const interactions = gql`
  {
    interactions {
      codeCISMedicament1
      nomMedicament1
      codeCISMedicament2
      nomMedicament2
      description
      type
      conseil
    }
  }
`;

export default interactions;
