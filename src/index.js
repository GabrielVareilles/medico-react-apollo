import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { AUTH_TOKEN } from './constants'
import { EMAIL } from './constants'

// 1 Apollo dependencies
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-client-preset'


// 2 Link to our Backend server
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// 3 Adds token & User email in headers if present
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const email = localStorage.getItem(EMAIL);

  operation.setContext({
    headers: {
      'X-User-Token': token,
      'X-User-Email': email,
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

// 4 Instantiates Apollo client with our httpLink
export const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
});

// 5 Renders App in DOM with react-dom
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)
registerServiceWorker()
