import { TOGGLE_THEME, SET_THEME } from '../actions/themeActions';

// Начальное состояние
const initialState = {
  currentTheme: localStorage.getItem('appTheme') || 'light',
};

// Редюсер темы
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('appTheme', newTheme);
      return {
        ...state,
        currentTheme: newTheme
      };
    
    case SET_THEME:
      localStorage.setItem('appTheme', action.payload);
      return {
        ...state,
        currentTheme: action.payload
      };
    
    default:
      return state;
  }
};

export default themeReducer;