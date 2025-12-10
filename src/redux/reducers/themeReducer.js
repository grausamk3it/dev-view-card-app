import { TOGGLE_THEME, SET_THEME } from '../actions/themeActions';
const initialState = {
  currentTheme: localStorage.getItem('appTheme') || 'light',
  themes: {
    light: {
      name: 'light',
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#f5f5f5',
        surface: '#ffffff',
        text: '#333333',
        textSecondary: '#666666',
        border: '#e0e0e0',
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545'
      }
    },
    dark: {
      name: 'dark',
      colors: {
        primary: '#7c93e0',
        secondary: '#9b6bd4',
        background: '#1a1a1a',
        surface: '#2d2d2d',
        text: '#ffffff',
        textSecondary: '#b0b0b0',
        border: '#404040',
        success: '#34ce57',
        warning: '#ffd65c',
        error: '#e4606d'
      }
    }
  }
};

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