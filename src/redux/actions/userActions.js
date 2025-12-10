
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';


export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
});