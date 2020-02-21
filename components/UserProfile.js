import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import {Icon, Input, Button} from 'react-native-elements'
import {setLikedConcert, setCurrentUser} from '../redux/user/user.actions';
import {connect} from 'react-redux';
import fetch from 'node-fetch';

const UserProfile = props => {
  const [text, handleText] = useState('');
  const hardcode = 'oQDZekJ489hmmgINOeQKTlB5RVn2'
  

  // NEEDS FIXING

  const postgresFetch = () => {
    console.log('Before', props)
    props.currentUser.artists.push(text)
    console.log('After', props)
    fetch(`http://localhost:4000/users/${props.uid}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify(props.currentUser)
    })
    .then(() => setCurrentUser(pgUserData))
    .catch(() => console.log('fuckkkkkkkedddddd'))
  }
  

  return (
    <SafeAreaView>
      <Input onChangeText={text => handleText(text)} placeholder='Add Artist Here' />
      <Button title="Solid Button" onPress={postgresFetch}/>
    </SafeAreaView>
  )
  
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  currentUser: state.user.currentUser
})

const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchtoProps)(UserProfile)