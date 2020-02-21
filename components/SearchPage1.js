import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, SafeAreaView, Modal, Dimensions, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import { Icon, Header, SearchBar} from 'react-native-elements';
import { LinearGradient} from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { TabView, SceneMap } from 'react-native-tab-view';
import {spotifyToken} from '../config/spotifyConfig';
import {connect} from 'react-redux';

import {chartmetricToken} from '../config/chartmetricConfig';
import {setGenreSearch} from '../redux/user/user.actions';

const genres = require('../assets/mockgenre.js');

const styles = StyleSheet.create({
  overallcontainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  theadercontainer: {
    flex: 1,
    marginTop: -50,
    position: 'relative',
    zIndex: 2
  },
  flexcontainer: {
    flex: 11,
    position: 'relative',
  },
  cardcontainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  },
  imageContainer: {
    width: '100%',
    height: '100%'
  },
  image: {
    resizeMode: 'cover',
    height: 125,
    flex: 1,
    margin: 4
  },
  scene: {
    flex: 1
  },
  marginTop: {
    marginTop: StatusBar.currentHeight
  },
});

const Search = props => {
  var spotify_chart_artist = [];
  var related_artists = [];
  var related_artists_details = {};

  const fetchGenre = async (item) => {
    const chartFetch = await chartmetricFetch(item)
    const spotFetch = await spotifyArtistFetch(chartFetch);
    await ticketMasterFetch(spotFetch, item.name)
  }

  const chartmetricFetch = async (item) => {
    const chartFetch = await fetch(`https://api.chartmetric.com/api/charts/soundcloud?date=2020-02-7&offset=0&country_code=US&kind=top&genre=${item.query}`, 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${chartmetricToken}`
        }
      })
    const chartJSON = await chartFetch.json();
    return chartJSON.obj.data.slice(0, 5)
  }

  const spotifyArtistFetch = async (json) => {
    for (var i = 0; i < json.length; i++) {
      const artistFetch = await fetch(`https://api.spotify.com/v1/search?q=${json[i].artist_names[0]}&type=artist`, 
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${spotifyToken}`
          }
        })
      const artistData = await artistFetch.json();
      if (artistData.artists.items.length) {
        spotify_chart_artist.push(artistData.artists.items[0])
      }
    }
    return spotify_chart_artist
  }

  const ticketMasterFetch = async (json, genre) => {
    var {setGenreSearch} = props
    var name;
    var counter = 0;
    // var artistArrays = [spotify_liked_artist].concat(json.artists)
    for (var i = 0; i < json.length; i++) {
      name = json[i].name
      related_artists.push(name)
      related_artists_details[name] =
        {
          'spotifyID': json[i].id,
          'spotifyDetails': json[i]
        }
      
      const ticketData = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=${name}&apikey=Y831HAlvhonyzxDxXaWPULurlbBRl0FB&size=40`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      const ticketMasterData = await ticketData.json();
      if (ticketMasterData['_embedded']) {
        related_artists_details[related_artists[counter]]['ticketMaster'] = ticketMasterData['_embedded'].events
      } else {
        delete related_artists_details[related_artists[counter]]
      }
      counter++
    }
    setGenreSearch(related_artists_details, genre)
  }


  const renderRow = ({item}) => {
    return (
      <TouchableOpacity onPress={() => fetchGenre(item)} style={{margin: 20, height: 60}}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }




  const [searchVisible, toggleSearch] = useState(false);
  const initialLayout = { width: Dimensions.get('window').width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Events' },
    { key: 'second', title: 'Artists' },
    { key: 'third', title: 'Friends' },
    { key: 'fourth', title: 'Groups' }
  ]);

  // const [first, ]

  const searchRoutes = {
    FirstRoute: () => (
      <View style={[styles.scene, { backgroundColor: '#ff4081' }]} >
        {data ? (
          <View>
            <View>
             <Image style={{height: 125}} source={{uri: data.concert._embedded.events[0].images[0].url}}/>
            </View>
            <FlatList data={data.concert._embedded.events} renderItem={event => (
            <View style={{flexDirection: 'row'}}>
              {/* <View style={{flex: 2}}>
              </View> */}
              <View style={{flex: 2}}>
                <Text>{JSON.stringify(event)}</Text>
              </View>
            </View> 
            )} keyExtractor={event => event.id.toString()}/>
          </View>
          ) : (
            null
          )
        }
      </View>

    ),
    SecondRoute: () =>  (<View style={[styles.scene, { backgroundColor: '#673ab7' }]} />),
    ThirdRoute: () => (<View style={[styles.scene, { backgroundColor: '#90EE90' }]} />),
    FourthRoute: () => (<View style={[styles.scene, { backgroundColor: '#ADD8E6' }]} />)
  }

  const renderScene = SceneMap({
    first: searchRoutes.FirstRoute,
    second: searchRoutes.SecondRoute,
    third: searchRoutes.ThirdRoute,
    fourth: searchRoutes.FourthRoute
  });

  const [cancel, showCancel] = useState(true)

  const [input, changeInput] = useState('');
  const handleSubmit = () => {
    getSearch({ variables: { title: input } })
  }

  return (
    <View style={styles.overallcontainer}> 
      <View style={styles.theadercontainer}>
        <Header backgroundColor='black' leftComponent={{ icon: 'menu', color: '#fff' }} centerComponent={{ text: 'Search Page', style: { color: '#fff' } }} rightComponent={{ icon: 'search' , color: '#fff'}} />
      </View>
      
      <View style={styles.flexcontainer}>

          <TouchableOpacity onPress={() => {toggleSearch(true)}}>
            <SearchBar containerStyle={{marginTop: 17}} placeholder="Search Here" onChangeText={e => {changeInput(e); toggleSearch(true)}} value={input} showCancel={cancel} onSubmitEditing={handleSubmit}/>
          </TouchableOpacity>

          {searchVisible ? (
              <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  initialLayout={initialLayout}
                  style={styles.marginTop}  
              />
          ) : (
            // <LinearGradient colors={['#a4508b', 'rgba(2,0,36,1)', 'rgba(0,0,0,1)']} >
            <LinearGradient colors={['white', 'white', 'white']} >
              <FlatList data={genres} renderItem={renderRow} keyExtractor={item => item.id.toString()} />
            </LinearGradient>
          )}
      </View>
      <View style={styles.bheadercontainer}>
        <View style={styles.bheadericon}>
          <Icon type='font-awesome' name='home' color='white' onPress={() => props.navigation.navigate('Home')}></Icon>
          <Icon type='font-awesome' name='users' color='white' onPress={() => props.navigation.navigate('Users')}></Icon>
          <Icon type='font-awesome' name='bell' color='white'></Icon>
          <Icon type='font-awesome' name='search' color='white'></Icon>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
    genre_search: state.user.genre_search
})
  
const mapDispatchtoProps = dispatch => ({
  setGenreSearch: (genre_data, genre) => dispatch(setGenreSearch(genre_data, genre))
})
  
export default connect(mapStateToProps, mapDispatchtoProps)(Search);
  