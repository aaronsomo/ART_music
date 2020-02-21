import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import Carousel from './Carousel';
import { connect } from 'react-redux';

import {
  setAccess,
  setLikedArtists,
  setRecommendedArtists,
  setCurrentUser
} from '../redux/user/user.actions';
import fetch from 'node-fetch';
import { spotifyToken } from '../config/spotifyConfig';

const data = [{ index: 1 }, { index: 2 }, { index: 3 }];

var IMGHEIGHT = Dimensions.get('screen').height / 4;

const styles = StyleSheet.create({
  overallcontainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  theadercontainer: {
    flex: 1,
    marginTop: -50,
    position: 'relative',
    zIndex: 2
  },
  flexcontainer: {
    flex: 11,
    position: 'relative'
  },
  cardcontainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  tcardheader: {
    flex: 1,
    marginBottom: 10
  },
  imagecontainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: IMGHEIGHT
  },
  image: {
    width: '100%',
    height: IMGHEIGHT
  },
  bheadercontainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  bheadericon: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

const HomePage = props => {
  const {
    setAccess,
    setLikedArtists,
    setRecommendedArtists,
    setCurrentUser
  } = props;

  useEffect(() => {
    var counter = 0;
    var numberOfArtists = 20;
    var related_artists = [];
    var related_artists_details = {};
    var liked_artist;
    var spotify_liked_artist;
    var user_liked_artists = {};

    const fetchData = async () => {
      const pgFetch = await postgresFetch();
      for (var i = 0; i < pgFetch.artists.length; i++) {
        const spotFetch = await spotifyArtistFetch(pgFetch.artists[i]);
        const spotFetch1 = await spotifyRelatedFetch(spotFetch);
        await ticketMasterFetch(spotFetch1);
      }
      setRecommendedArtists(related_artists_details);
      setAccess(true);
    };

    const postgresFetch = async () => {
      const pgUserFetch = await fetch(
        `http://localhost:4000/users/${props.uid}`,
        {
          method: 'GET'
        }
      );
      const pgUserData = await pgUserFetch.json();
      setCurrentUser(pgUserData);
      return pgUserData;
    };

    const spotifyArtistFetch = async artist => {
      console.log(artist);
      const artistFetch = await fetch(
        `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${spotifyToken}`
          }
        }
      );
      const artistData = await artistFetch.json();
      spotify_liked_artist = artistData.artists.items[0];

      user_liked_artists[liked_artist] = {
        id: artistData.artists.items[0].id,
        spotifyDetails: artistData.artists.items[0]
      };
      return spotify_liked_artist;
    };

    const spotifyRelatedFetch = async res => {
      console.log(res);
      const relatedArtistFetch = await fetch(
        `https://api.spotify.com/v1/artists/${res.id}/related-artists`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${spotifyToken}`
          }
        }
      );
      const spotifyRelatedArtistData = await relatedArtistFetch.json();
      return spotifyRelatedArtistData;
    };

    const ticketMasterFetch = async json => {
      console.log('IM HEREE', json);
      console.log('SPOT ME', spotify_liked_artist);
      var name;
      var artistArrays = [spotify_liked_artist].concat(json.artists);
      for (var i = 0; i < numberOfArtists + 1; i++) {
        name = artistArrays[i].name;
        related_artists.push(name);
        related_artists_details[name] = {
          spotifyID: artistArrays[i].id,
          spotifyDetails: artistArrays[i]
        };

        const ticketData = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=${name}&apikey=Y831HAlvhonyzxDxXaWPULurlbBRl0FB&size=40`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
        const ticketMasterData = await ticketData.json();
        if (ticketMasterData['_embedded']) {
          related_artists_details[related_artists[counter]]['ticketMaster'] =
            ticketMasterData['_embedded'].events;
        } else {
          delete related_artists_details[related_artists[counter]];
        }
        counter++;
        console.log(counter);
      }
    };
    fetchData();
  }, []);

  const hardCode = [
    '0',
    'Recently Viewed',
    'Recommended for You',
    'Your Likes'
  ];
  var i = 0;

  return (
    <View style={styles.overallcontainer}>
      <TouchableOpacity
        style={styles.theadercontainer}
        onPress={() => props.navigation.navigate('UserProfile')}
      >
        <Header
          backgroundColor="black"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Home Page', style: { color: '#fff' } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
      </TouchableOpacity>

      <View style={styles.flexcontainer}>
        <LinearGradient colors={['white', 'white', 'white']}>
          {props.access ? (
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                i++;
                return (
                  <View style={{ marginTop: 20 }}>
                    <Text>{hardCode[i]}</Text>
                    <Carousel index={index} />
                  </View>
                );
              }}
              keyExtractor={item => item.index.toString()}
            />
          ) : null}
        </LinearGradient>
      </View>
      <View style={styles.bheadercontainer}>
        <View style={styles.bheadericon}>
          <Icon type="font-awesome" name="home" color="white"></Icon>
          <Icon
            type="font-awesome"
            name="users"
            color="white"
            onPress={() => props.navigation.navigate('Groups')}
          ></Icon>
          <Icon type="font-awesome" name="bell" color="white"></Icon>
          <Icon
            type="font-awesome"
            name="search"
            color="white"
            onPress={() => props.navigation.navigate('Search')}
          ></Icon>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  uid: state.user.uid,
  currentUser: state.user.currentUser,
  recommended_artists: state.user.recommended_artists,
  access: state.user.access,
  liked_artists: state.user.liked_artists
});

const mapDispatchtoProps = dispatch => ({
  setRecommendedArtists: details => dispatch(setRecommendedArtists(details)),
  setAccess: access => dispatch(setAccess(access)),
  setLikedArtists: liked_artists => dispatch(setLikedArtists(liked_artists)),
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchtoProps)(HomePage);
