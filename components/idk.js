// import { StyleSheet, Text, View, Button, Image } from 'react-native';
// import { signInWithFacebook} from '../firebase/facebookAuth';
// import React, { Component } from 'react';
// import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
// import { AuthSession } from 'expo';
// import { FontAwesome } from '@expo/vector-icons';
// import * as Facebook from 'expo-facebook';
// const config = require('../../config/config');
// import { Firebase } from './firebase';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   fbcontainer: {
//     flexDirection: 'column',
//     backgroundColor: '#000',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
//   button: {
//     backgroundColor: '#2FD566',
//     padding: 20
//   },
//   buttonText: {
//     color: '#000',
//     fontSize: 20
//   },
//   userInfo: {
//     height: 250,
//     width: 200,
//     alignItems: 'center',
//   },
//   userInfoText: {
//     color: '#fff',
//     fontSize: 18
//   },
//   errorText: {
//     color: '#fff',
//     fontSize: 18
//   },
//   profileImage: {
//     height: 64,
//     width: 64,
//     marginBottom: 32
//   }
// });

// export default function Login () {
//   const FacebookLoginButton = () => {
//       [user, setUser] = useState('');
//       [email, setEmail] = useState('');
//       [signedIn, setSignedIn] = useState(false);
//   ​
//     if (user) {
//           console.log('logged in')
//     } else {
//         console.log('did not work');
//     }
//     return (
//       <View>
//         { user ? (
//           <View style={styles.container}>
//             <Text>You are logged in!</Text>
//             {avatar}
//             <Text>{user}</Text>
//             <Button onPress={() => logout()} title='Log out' />
//           </View>
//         ) : (
//           <View style={styles.container}>
//             <Text>Welcome!</Text>
//             <Button onPress={()=> signInWithFacebook()} title='Login with Facebook' />
//           </View>
//         )}
//       </View>
//     );
//   };

//   const SpotifyLogin = () => {
//     const [userInfo, setUserInfo] = useState(null);
//     const [didError, setError] = useState(false)
//     const handleSpotifyLogin = async () => {
//       let redirectUrl = AuthSession.getRedirectUrl();
//       let results = await AuthSession.startAsync({
//         authUrl: `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-email&response_type=token`
//       });
//       if (results.type !== 'success') {
//           setError(true);
//         } else {
//           const userInfo = await axios.get(`https://api.spotify.com/v1/me`, {
//             headers: {
//               "Authorization": `Bearer ${results.params.access_token}`
//             }
//           });
//           setError(userInfo.data);
//         }
//     };
//     const displayError = () => {
//       return (
//         <View style={styles.userInfo}>
//           <Text style={styles.errorText}>
//             There was an error, please try again.
//           </Text>
//         </View>
//       );
//     }
  
//     const displayResults = () => {
//       { return userInfo ? (
//         <View style={styles.userInfo}>
//           <Image
//             style={styles.profileImage}
//             source={ {'uri': userInfo.images[0].url} }
//           />
//           <View>
//             <Text style={styles.userInfoText}>
//               Username:
//             </Text>
//             <Text style={styles.userInfoText}>
//               {userInfo.id}
//             </Text>
//             <Text style={styles.userInfoText}>
//               Email:
//             </Text>
//             <Text style={styles.userInfoText}>
//               {userInfo.email}
//             </Text>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.userInfo}>
//           <Text style={styles.userInfoText}>
//             Login to Spotify to see user data.
//           </Text>
//         </View>
//       )}
//     } 
//     return (
//       <View style={styles.fbcontainer}>
//         <FontAwesome
//           name="spotify"
//           color="#2FD566"
//           size={128}
//         />
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSpotifyLogin}
//           disabled={userInfo ? true : false}
//         >
//           <Text style={styles.buttonText}>
//             Login with Spotify
//           </Text>
//         </TouchableOpacity>
//         {didError ?
//           displayError() :
//           displayResults()
//         }
//       </View>
//     )};
//   const FacebookLogin = async () => {
//       try {
//       const appId = config.development.facebook.app_id;
//       await Facebook.initializeAsync(appId);
//     ​
//       const permissions = ['public_profile', 'email']; 
      
//       const {
//         type,
//         token,
//       } = await Facebook.logInWithReadPermissionsAsync(
//         {permissions}
//       );
//     ​
//       if (type === 'success') {
//         await Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL); 
//         const credential = Firebase.auth.FacebookAuthProvider.credential(token);
//         const facebookProfileData = await Firebase.auth().signInAndRetrieveDataWithCredential(credential);  
//         alert(JSON.stringify(facebookProfileData));
//       } else {
//       }
//     } catch ({ message }) {
//       alert(`Facebook Login Error: ${message}`);
//     }
//   }
//   return (
//     <div>
//       <FacebookLoginButton/>
//       <SpotifyLogin />
//     </div>
//   )
// }
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export default function Login () {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
 
  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  }
 
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
 
  if (initializing) return null;
 
  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
 
  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}
​


