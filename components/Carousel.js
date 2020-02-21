import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { StyleSheet, Text, View, Button, Image, FlatList, SafeAreaView, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {selectRecommendedArtists, selectLikedConcerts} from '../redux/user/user.selector';
import {connect} from 'react-redux';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import {Icon} from 'react-native-elements'

import TicketComponent from './TicketComponent'





const MyCarousel = props => {
  const {selectRecommendedArtists, selectLikedConcerts} = props;

  const [flipPicture, toggleFlip] = useState(false)

  
  const renderItem = ({item, index}, parallaxProps) => {
    if (item.id === '4AVFqumd2ogHFlRbKIjp1t') {
      return (
        <TouchableOpacity style={styles.item} onPress={() => toggleFlip(index)}>
          <ParallaxImage
                source={{ uri: `${item.spotifyDetails.images[0].url}` }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
              />
        </TouchableOpacity>
      )
    } else {

      return (
        <View>
          {
            flipPicture === index ? (
                <TicketComponent item={item}/>
              ) : (
                <TouchableOpacity style={styles.item} onPress={() => toggleFlip(index)}>
                  <ParallaxImage
                    source={{ uri: `${item.spotifyDetails.images[0].url}` }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                  />
                </TouchableOpacity>
              )
          }
        </View>
      )
    };
  }

  // OG CODE
  // <TouchableOpacity style={styles.item}>
  //     <ParallaxImage
  //       source={{ uri: `${item.spotifyDetails.images[0].url}` }}
  //       containerStyle={styles.imageContainer}
  //       style={styles.image}
  //       parallaxFactor={0.4}
  //       {...parallaxProps}
  //     />
  // </TouchableOpacity>

  const carousel = {
    0: selectRecommendedArtists,
    1: selectRecommendedArtists,
    2: selectLikedConcerts,
    3: selectLikedConcerts
    // 3: selectLikedArtists
  }

  return (
    <Carousel
      sliderWidth={vw(100)}
      sliderHeight={vh(100)}
      itemWidth={vw(85)}
      data={carousel[props.index]}
      renderItem={renderItem}
      hasParallaxImages={true}
    />
  );
}


const mapStateToProps = state => ({
  selectRecommendedArtists: selectRecommendedArtists(state),
  selectLikedConcerts: selectLikedConcerts(state)
})


export default connect(mapStateToProps)(MyCarousel)

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