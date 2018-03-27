import gql from 'graphql-tag';

const signUp = gql`
  mutation signUp($email: String!, $password: String!, $password_confirmation: String!) {
    signUp(input: {
      email: $email
      password: $password
      password_confirmation: $password_confirmation
    }) {
      token
      user {
        email
      }
    }
  }
`
export default signUp;
