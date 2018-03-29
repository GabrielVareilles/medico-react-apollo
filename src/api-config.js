let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:4000';
} else {
  backendHost = 'https://medico-gql-api.herokuapp.com';
}

export const API_ROOT = backendHost;
