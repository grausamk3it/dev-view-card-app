import { LOGIN_USER, LOGOUT_USER, SET_CURRENT_USER } from '../actions/userActions';

// Initial state
const initialState = {
  currentUser: null,
  isAuthenticated: false
};

// User reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true
      };
    
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };
    
    default:
      return state;
  }
};

export default userReducer;