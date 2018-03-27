import gql from 'graphql-tag';

const findMedicine = gql`
  query findMedicine($codeCIS: String!) {
    findMedicine(codeCIS: $codeCIS) {
      codeCIS
      denomination
      indicationsTherapeutiques
      formePharmaceutique
      voiesAdministration
      etatCommercialisation
      statutAdministratifAMM
      presentations {
        libelle
        tauxRemboursement
        prix
      }
      compositions {
        referenceDosage
        substancesActives {
          codeSubstance
          dosageSubstance
          denominationSubstance
        }
      }
    }
  }
`;

export default findMedicine;
