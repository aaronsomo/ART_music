export const setCurrentUID = user => ({
  type: 'SET_CURRENT_UID',
  payload: user
})


export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload: user
})

export const setCurrentData = (objects) => {
  return ({
    type: 'SET_CURRENT_DATA',
    payload: objects
  });
};

export const setLikedArtists = liked_artists => {
  return ({
    type: 'SET_LIKED_ARTISTS',
    payload: liked_artists
  });
};

export const setCurrentRelated = (objects) => {
  return ({
    type: 'SET_CURRENT_RELATED',
    payload: objects
  });
};

export const setArtistsRelated = (objects) => {
  return ({
    type: 'SET_ARTISTS_RELATED',
    payload: objects
  });
};

export const setRecommendedArtists = (objects) => {
  return ({
    type: 'SET_RECOMMENDED_ARTISTS',
    payload: objects
  });
};

export const setAccess = (objects) => {
  return ({
    type: 'SET_ACCESS',
    payload: objects
  });
};


export const setLikedConcert = concerts => {
  return ({
    type: 'SET_LIKED_CONCERT',
    payload: concerts
  })
}

export const deleteLikedConcert = concerts => {
  return ({
    type: 'DELETE_LIKED_CONCERT',
    payload: concerts
  })
}

export const setGenreSearch = (genre_data, genre) => {
  console.log('REDUCER', genre_data, genre)
  return ({
    type: 'SET_GENRE_SEARCH',
    payload: [genre_data, genre]
  })
}