let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'chien-geant') {
  backendHost = 'https://medico-gql-api.herokuapp.com';
}

if (hostname === 'localhost') {
  backendHost = 'http://localhost:4000';
}
console.log(hostname);
export const API_ROOT = backendHost;
