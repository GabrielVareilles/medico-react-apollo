import gql from 'graphql-tag';

const signIn = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: {
      email: $email
      password: $password
    }) {
      token
      user {
        email
      }
    }
  }
`
export default signIn;
