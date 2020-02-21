import React, { Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import firebase from '../Firebase/firebase';
import axios from 'axios';
import {setCurrentUser, setCurrentUID} from '../redux/user/user.actions';
import {connect} from 'react-redux';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b5ec',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }
});

const SignUp = props => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [artists, setArtist] = useState('')

  const {setCurrentUser, setCurrentUID} = props

  const handleOnSignup = async () => {
    try {
      const response = await firebase.signupWithEmail(
        email,
        password
      )  
      if (response.user.uid) {
        const userData = {displayName, email}
        firebase.createNewUser(response.user.uid, userData)

        axios.post('http://localhost:4000/users', 
        {
          uid: response.user.uid,
          data: {
            artists: artists,
            displayName: displayName,
            liked_concerts: {},
            groups: {}
          }
        })
        setCurrentUID(response.user.uid)
        props.navigation.navigate('Home')
      }
    } catch (error) {
      console.error('ERROR')
    }
  }
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={displayName => setDisplayName(displayName)}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={email => setEmail(email)}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={password => setPassword(password)}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Artist"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={artist => setArtist([artist])}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={handleOnSignup}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>

      </View>
    );
  }

// const mapStateToProps = state => ({
//   uid: state.user.uid
// })
// export default connect(mapStateToProps)(SignUp)

const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCurrentUID: data => dispatch(setCurrentUID(data))
})
export default connect(null, mapDispatchtoProps)(SignUp)
// export default SignUp