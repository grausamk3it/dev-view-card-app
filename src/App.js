import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'light';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
  };

  // Слушаем изменения localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Проверяем каждую секунду (для отладки)
    const interval = setInterval(() => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      if (authStatus !== isAuthenticated) {
        setIsAuthenticated(authStatus);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  console.log('App render - isAuthenticated:', isAuthenticated);

  return (
    <Router>
      <div className="App" data-theme={theme}>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login theme={theme} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard theme={theme} toggleTheme={toggleTheme} /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/products" 
            element={
              isAuthenticated ? 
              <div style={{ padding: '50px', textAlign: 'center' }}>
                <h2>Страница товаров</h2>
                <p>Скоро здесь будет управление товарами</p>
              </div> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;