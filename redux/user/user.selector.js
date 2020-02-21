import { createSelector } from 'reselect'

const selectUser = state => state.user;

export const selectRecommendedArtists = createSelector([selectUser], user => {
  user.recommended_pool = []

  for (var liked_artist in user.liked_artists) {
    user.recommended_pool.push(user.liked_artists[liked_artist])
  };

  for (var rec_artist in user.recommended_artists) {
    // user.recommended_artists[rec_artist].ticketMaster['_embedded'].events.artist = rec_artist;
    if (user.recommended_artists[rec_artist].ticketMaster) {
      var currentEvents = user.recommended_artists[rec_artist].ticketMaster
      for (var i = 0; i < currentEvents.length; i++) {
        currentEvents[i]['artist'] = rec_artist
      }
      user.recommended_pool.push(user.recommended_artists[rec_artist])
    }
  };
  // for (var rec_artist in user.recommended_artists) {
  // user.recommended_artists[rec_artist].ticketMaster['_embedded'].events.artist = rec_artist;
    // if (user.recommended_artists[rec_artist].ticketMaster['_embedded']) {
  //     var currentEvents = user.recommended_artists[rec_artist].ticketMaster['_embedded'].events
  //     for (var i = 0; i < currentEvents.length; i++) {
  //       currentEvents[i]['artist'] = rec_artist
  //     }
  //     user.recommended_pool.push(user.recommended_artists[rec_artist])
  //   }
  // };
  
  return user.recommended_pool
});

export const selectLikedConcerts = createSelector([selectUser], user => {
  var concert_pool = [];
  for (var artist in user.currentUser.liked_concerts) {
    var details = user.currentUser.liked_concerts[artist];
    concert_pool.push(details)
  }
  return concert_pool 
});

