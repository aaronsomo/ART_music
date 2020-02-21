// Function that gets 2 properties (inital state, action)
const INITIAL_STATE = {
  uid: 1,
  currentUser: '',
  recommended_artists: '',
  access: false,
  genre_search: ''
}

const userReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_UID' :
      return {
        ...state,
        uid: action.payload
      }    
    case 'SET_CURRENT_USER' :
      return {
        ...state,
        currentUser: action.payload
      }
    case 'SET_LIKED_ARTISTS' :
      return {
        ...state,
        liked_artists: action.payload
      };
    case 'SET_ACCESS' :
      return {
        ...state,
        access: action.payload
      }
    case 'SET_RECOMMENDED_ARTISTS' :
      return {
        ...state,
        recommended_artists: action.payload
      }
    case 'SET_LIKED_CONCERT' :
      return {
        ...state,
        liked_concerts: action.payload
      }
    case 'DELETE_LIKED_CONCERT' :
      return {
        ...state,
        liked_concerts: action.payload
      }
    case 'SET_GENRE_SEARCH' :
      return {
        ...state,
        genre_search: {[action.payload[1]]: action.payload[0]}
      }
    default:
      return state
  }
}

export default userReducer;