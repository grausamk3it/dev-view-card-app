import React, { useState } from 'react';
import './Login.css';

const users = [
  { id: 1, username: 'admin', password: 'admin123', name: 'Администратор', role: 'admin' },
  { id: 2, username: 'manager', password: 'manager123', name: 'Менеджер', role: 'manager' },
  { id: 3, username: 'user', password: 'user123', name: 'Пользователь', role: 'user' }
];

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Вход в систему</h2>
        <p className="subtitle">Магазин компьютерной техники</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
        
        <div className="demo-accounts">
          <h4>Тестовые аккаунты:</h4>
          <p>admin / admin123</p>
          <p>manager / manager123</p>
          <p>user / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;