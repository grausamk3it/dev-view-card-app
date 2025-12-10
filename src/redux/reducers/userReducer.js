import { LOGIN_USER, LOGOUT_USER, SET_CURRENT_USER } from '../actions/userActions';


const initialState = {
  currentUser: null,
  isAuthenticated: false,
  users: [
    { id: 1, username: 'admin', password: 'admin123', name: 'Администратор', role: 'admin' },
    { id: 2, username: 'manager', password: 'manager123', name: 'Менеджер', role: 'manager' },
    { id: 3, username: 'user', password: 'user123', name: 'Пользователь', role: 'user' }
  ]
};


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