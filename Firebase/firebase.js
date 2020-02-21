import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from '../config/firebaseConfig'

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// firebase.auth().onAuthStateChanged(user => {
//   console.log('LOOK AT ME', user)
// })

const Firebase = {
  // auth
  loginWithEmail: (email, password, props) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)    
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },


  // firestore
  createNewUser: (uid, data) => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${uid}`)
      .set(data)
  },
  signInWithGoogle: () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({prompt: 'select_account'})
    return firebase.auth().signInWithPopup(provider)
  }
  
}
export default Firebase


