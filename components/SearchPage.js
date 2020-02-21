import React, {useState, useRef, useCallback} from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, SafeAreaView, Modal, Dimensions, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import { Avatar, Icon, Header, SearchBar} from 'react-native-elements';
import { LinearGradient} from 'expo-linear-gradient';
import Constants from 'expo-constants';
import Carousel from './Carousel';
import { Router, Scene, Actions} from 'react-native-router-flux';
import { TabView, SceneMap } from 'react-native-tab-view';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { useMutation } from '@apollo/react-hooks'

import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import {withApollo} from 'react-apollo';

const Pictures = require('../assets/mockdata2');
var IMGHEIGHT = Dimensions.get('screen').height/4

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


// const SEARCH_TICKET = gql`
//   mutation SearchTicket($title: String) {
//     searchTicket(type: $title) {
//       _embedded {
//         events {
//           name
//           id
//           dates {
//             start {
//               localDate
//               localTime
//               dateTime
//             }
//           }
//         }
//       }
//     }
//   }
// `;



const Search = props => {
  console.log('HIT')
  var i = 0
  const renderRow = ({item}) => {
    console.log(item, 'hadfs')
    i++
    if (i % 2 === 0) {
      return (
        <View style={{width: '100%'}}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Image style={{flex: 2, margin: 4}} source={{uri: item[2].image}} />
            <View style={{flexDirection: 'column', flex: 1}}>
              <Image style={styles.image} source={{uri: item[0].image}} />
              <Image style={styles.image} source={{uri: item[1].image}} />
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{width: '100%'}}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Image style={styles.image} source={{uri: item[0].image}} />
              <Image style={styles.image} source={{uri: item[1].image}} />
            </View>
            <Image style={{flex: 2, margin: 4}} source={{uri: item[2].image}} />
          </View>
        </View>
      )
    }
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
  const [search, setSearch] = useState(null);


  const [getSearch, { loading, data }] = useLazyQuery(query);
  if (data) {
    console.log(data.concert._embedded.events)
  }

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
            <LinearGradient colors={['#a4508b', 'rgba(2,0,36,1)', 'rgba(0,0,0,1)']} >
              <FlatList data={Pictures} renderItem={renderRow} keyExtractor={item => item[0].id.toString()} />
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

const query = gql`
  query Concert($title: String) {
    concert(name: $title) {
      _embedded {
        events {
          name
          id
          images {
            ratio
            url
          }
          outlets {
            url
            type
          }
          dates {
            start {
              localDate
              localTime
              dateTime
            }
          }
          _embedded {
            venues {
              name
              postalCode
              city {
                name
              }
              state {
                name
                stateCode
              }
              country {
                name
                countryCode
              }
              address {
                line1
              }
              location {
                longitude
                latitude
              }
            }
            attractions {
              name
              url
              externalLinks {
                youtube {
                  url
                }
                twitter {
                  url
                }
                facebook {
                  url
                }
                wiki {
                  url
                }
                homepage {
                  url
                }
              }
              classifications {
                genre {
                  name
                }
                subGenre {
                  name
                }
              }
            }
          }
        }
      }
    }
  }`;

export default withApollo(Search)