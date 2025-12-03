import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

// Create Redux store
const store = createStore(
  rootReducer,
  // Enable Redux DevTools Extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;