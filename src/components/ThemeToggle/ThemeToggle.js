import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme, colors }) => {
  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
      style={{
        background: colors ? `rgba(255, 255, 255, 0.2)` : 'rgba(0, 0, 0, 0.1)',
        color: 'white',
        border: `1px solid rgba(255, 255, 255, 0.3)`
      }}
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