// import { Router, Scene, Actions} from 'react-native-router-flux';
// import HomePage from './components/HomePage.js'
// import UsersPage from './components/UsersPage.js'
// import SearchPage from './components/SearchPage.js';
// import ApolloClient from 'apollo-client';
// import { ApolloProvider } from 'react-apollo';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// import React, {useState, useEffect} from 'react';

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   cache,
//   link: new HttpLink({
//     uri: 'http://localhost:4000/graphql',
//   })
// })

// export default function App() {
//   return (

//     <ApolloProvider client={client}>
//       <Router>
//         <Scene key="root">
//           <Scene key="home" component={HomePage} hideNavBar={true} initial/>
//           <Scene key="users" component={UsersPage} hideNavBar={true} />
//           <Scene key="search" component={SearchPage} hideNavBar={true}/>
//         </Scene>
//       </Router>
//     </ApolloProvider>
//   );
// };

// Apollo Graphql Client
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';

// Navigation
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import SearchPage1 from './components/SearchPage1';

import UsersPage from './components/UsersPage';
import Signup from './components/Signup';
import Login from './components/Login';

import UserProfile from './components/UserProfile';

import AllGroupsPage from './components/AllGroupsPage';
import Chat from './components/Chat';
import GroupPage from './components/GroupPage';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  })
});

const AppNavigator = createStackNavigator(
  {
    Home: HomePage,
    Groups: AllGroupsPage,
    Chat: Chat,
    // Search: SearchPage,
    Search: SearchPage1,
    Login: Login,
    Signup: Signup,
    UserProfile: UserProfile,
    GroupPage: GroupPage
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'Home',

    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

import store from './redux/store';
import { connect } from 'react-redux';
// Allows our app to have access to redux
import { Provider } from 'react-redux';

const App = props => {
  return (
    // <ApolloProvider client={client}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ApolloProvider>

    // </ApolloProvider>
  );
};
// const mapStateToProps = state => ({
//   uid: state.user.uid
// })

// export default connect(mapStateToProps)(App)
export default App;

// import React from 'react'
// import AppContainer from './components/AppContainer.js'
// import Firebase, { FirebaseProvider } from './config/Firebase'
// import Signup from './components/Signup.js'

// export default function App() {
//   return (
//     <FirebaseProvider value={Firebase}>
//       <Signup />
//     </FirebaseProvider>
//   )
// }
