import { Router, Scene, Actions} from 'react-native-router-flux';
import HomePage from './HomePage.js'
import UsersPage from './UsersPage.js'
import SearchPage from './SearchPage.js';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import React, {useState, useEffect} from 'react';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  })
})



export default function App() {
  return (
    
    <ApolloProvider client={client}>
      <Router>
        <Scene key="root">
          <Scene key="home" component={HomePage} hideNavBar={true} initial/>
          <Scene key="users" component={UsersPage} hideNavBar={true} />
          <Scene key="search" component={SearchPage} hideNavBar={true}/>
        </Scene>
      </Router>
    </ApolloProvider>
  );
};