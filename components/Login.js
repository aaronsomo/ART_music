import { withFirebaseHOC } from '../Firebase'
import React, {useState, useEffect} from 'react'
import { Button, Input } from 'react-native-elements'
import { StyleSheet, SafeAreaView, View, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import firebase from '../Firebase/firebase'
import { setCurrentUID } from '../redux/user/user.actions'
import {connect} from 'react-redux';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';




const styles = StyleSheet.create({
    inputContainer: {
      margin: 15
    },
    iconStyle: {
      marginRight: 10
    },
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    buttonContainer: {
      margin: 25
    }
})


const Login = props => {
  const {setCurrentUID} = props

  const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
      <Button
        {...rest}
        type={buttonType}
        title={title}
        buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
        titleStyle={{ color: buttonColor }}
      />
  )


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   console.log(email, password)
  // }, [email, password]);
  
  // const handleEmailChange = email => {
  //   setEmail({ email })
  // }
  // const handlePasswordChange = password => {
  //   setPassword( password )
  // }


  const handleOnLogin = async event => {
    event.preventDefault();
    
    try {
      firebase.loginWithEmail(email, password)
      .then(res => {
        setCurrentUID(res.user.uid)
        props.navigation.navigate('Home')
      })
    } catch(error) {
      if (error.code === 'auth/user-not-found' || 'auth/invalid-email' || 'auth/user-disabled' || 'auth/wrong-password') {
        Alert.alert(
          'User Not Found',
          'Please enter correct credentials',
          [
            {text: 'Cancel'},
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Cancel', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
    }
  }

  const goToSignup = () => props.navigation.navigate('Signup')

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.inputContainer}>
        <Input
          leftIcon={<Ionicons name="ios-mail" size={28} color="#2C384A" />}
          leftIconContainerStyle={styles.iconStyle}
          placeholderTextColor="grey"
          style={styles.input}
          name="email"
          placeholder="Enter email"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          leftIcon={<Ionicons name="ios-lock" size={28} color="#2C384A" />}
          leftIconContainerStyle={styles.iconStyle}
          placeholderTextColor="grey"
          style={styles.input}
          name="email"
          placeholder="Enter password"
          autoCapitalize="none"
          iconName="ios-mail"
          iconColor="#2C384A"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <FormButton
          buttonType="outline"
          onPress={handleOnLogin}
          title="LOGIN"
          buttonColor="#039BE5"
        />
      </View>

      {/* <View style={styles.buttonContainer}>
        <FormButton
          buttonType="outline"
          onPress={firebase.signInWithGoogle}
          title="SIGN IN WITH GOOGLE"
          buttonColor="#039BE5"
        />
      </View> */}
      
      <Button
        title="Don't have an account? Sign Up"
        onPress={goToSignup}
        titleStyle={{
          color: '#F57C00'
        }}
        type="clear"
        />
    </SafeAreaView>
  )
}


const mapDispatchtoProps = dispatch => ({
  setCurrentUID: user => dispatch(setCurrentUID(user))
})

export default connect(null, mapDispatchtoProps)(withFirebaseHOC(Login))
