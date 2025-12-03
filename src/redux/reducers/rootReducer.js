import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  theme: themeReducer
});

export default rootReducer;