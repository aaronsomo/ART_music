import { StyleSheet, Text, View, Button, Image, FlatList, SafeAreaView, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import {Icon} from 'react-native-elements'
import {setLikedConcert, setCurrentUser} from '../redux/user/user.actions';
import {connect} from 'react-redux';
import fetch from 'node-fetch';

const TicketComponent = props => {


  const {setLikedConcert, setCurrentUser} = props;  

  const changeColor = (item, index, color) => {
    if (color === 'like') {
      props.currentUser['liked_concerts'][item.artist] = {
        spotifyID: props.item.spotifyID,
        spotifyDetails: props.item.spotifyDetails,
        ticketMaster: props.currentUser.liked_concerts[item.artist] ? [...props.currentUser['liked_concerts'][item.artist].ticketMaster, props.item.ticketMaster[index]] : [props.item.ticketMaster[index]]
      }
    } else {
      props.currentUser['liked_concerts'][item.artist].ticketMaster.forEach((concert, index) => {
        if (concert.id === item.id) {
          props.currentUser['liked_concerts'][item.artist].ticketMaster.splice(index, 1)
        }
      })
    }
    if (props.currentUser.liked_concerts[item.artist].ticketMaster.length === 0) {
      delete props.currentUser['liked_concerts'][item.artist]
    } 

    setCurrentUser(props.currentUser)

    // props.currentUser['liked_concerts'] = props.liked_concerts;
    fetch(`http://localhost:4000/users/${props.uid}`,
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify(props.currentUser),
      method: 'PUT'
    })    
  }


  return (
    <FlatList style={styles.item}
      data={props.item.ticketMaster}
      renderItem={({item, index}) => {
        if (props.currentUser.liked_concerts[item.artist]) {
          if (props.currentUser.liked_concerts[item.artist].ticketMaster.some(element => element.id === item.id )) {
            return (
              <View>
                <Icon type='font-awesome' name='heart' color='red' onPress={() => changeColor(item, index, 'unlike')}></Icon>
                <Text>{JSON.stringify(item)}</Text>
              </View>
            )
          } else {
            return (
              <View>
                <Icon type='font-awesome' name='heart' color='blue' onPress={() => changeColor(item, index, 'like')}></Icon>
                <Text>{JSON.stringify(item)}</Text>
              </View>
            )
          }
        } else {
          return (
            <View>
              <Icon type='font-awesome' name='heart' color='blue' onPress={() => changeColor(item, index, 'like')}></Icon>
              <Text>{JSON.stringify(item)}</Text>
            </View>
          )
        }
      }}
      keyExtractor={item => item.id}
    />
  )
}

const mapDispatchtoProps = dispatch => ({
  setLikedConcert: details => dispatch(setLikedConcert(details)),
  deleteLikedConcert: details => dispatch(deleteLikedConcert(details)),
  setCurrentUser: details => dispatch(setCurrentUser(details))
})

const mapStateToProps = state => ({
  recommended_artists: state.user.recommended_artists,
  liked_concerts: state.user.liked_concerts,
  currentUser: state.user.currentUser,
  uid: state.user.uid
})

export default connect(mapStateToProps, mapDispatchtoProps)(TicketComponent)

const styles = StyleSheet.create({
    item: {
      width: vw(60),
      height: vh(35),
      marginTop: vh(4)
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 20
    },
    image: {
      // ...StyleSheet.absoluteFillObject,
      resizeMode: 'contain'
      // width: '10%'
    },
  })