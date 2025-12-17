// Константы для типов действий
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_THEME = 'SET_THEME';

// Создатели действий (Action Creators)
export const toggleTheme = () => ({
  type: TOGGLE_THEME
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});