import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button 
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      title={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
    >
      <span className="theme-icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-text">
        {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
      </span>
    </button>
  );
};

export default ThemeToggle;