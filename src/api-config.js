let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'chien-geant') {
  backendHost = 'https://medico-gql-api.herokuapp.com';
}

if (hostname === 'http://localhost:3000') {
  backendHost = 'http://localhost:4000';
}

export const API_ROOT = backendHost;
