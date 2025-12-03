import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const users = [
  { id: 1, username: 'admin', password: 'admin123', name: 'Администратор' },
  { id: 2, username: 'manager', password: 'manager123', name: 'Менеджер' },
  { id: 3, username: 'user', password: 'user123', name: 'Пользователь' }
];

const Login = ({ theme = 'light' }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Простые цвета для тем
  const themeColors = {
    light: {
      primary: '#667eea',
      secondary: '#764ba2',
      background: '#f5f5f5',
      surface: '#ffffff',
      text: '#333333',
      textSecondary: '#666666',
      border: '#ddd',
      error: '#c62828'
    },
    dark: {
      primary: '#7c93e0',
      secondary: '#9b6bd4',
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      border: '#404040',
      error: '#e4606d'
    }
  };

  const colors = themeColors[theme];

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    e.stopPropagation(); // Останавливаем всплытие события
    
    console.log('Форма отправлена');
    console.log('Username:', username);
    console.log('Password:', password);
    
    setLoading(true);
    setError('');

    // Имитируем задержку для отладки
    setTimeout(() => {
      const user = users.find(u => 
        u.username === username && u.password === password
      );
      
      console.log('Найден пользователь:', user);
      
      if (user) {
        console.log('Авторизация успешна');
        
        // Сохраняем в localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        
        console.log('localStorage установлен');
        console.log('currentUser:', localStorage.getItem('currentUser'));
        console.log('isAuthenticated:', localStorage.getItem('isAuthenticated'));
        
        // Перенаправляем на dashboard
        navigate('/dashboard');
      } else {
        console.log('Авторизация не удалась');
        setError('Неверное имя пользователя или пароль');
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-container" style={{ 
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className="login-form" style={{ 
        backgroundColor: colors.surface, 
        color: colors.text,
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Вход в систему</h2>
        <p style={{ textAlign: 'center', color: colors.textSecondary, marginBottom: '30px' }}>
          Магазин компьютерной техники
        </p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Имя пользователя:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              style={{ 
                width: '100%',
                padding: '12px',
                border: `2px solid ${colors.border}`,
                borderRadius: '5px',
                backgroundColor: colors.background,
                color: colors.text
              }}
              placeholder="Введите имя пользователя"
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Пароль:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={{ 
                width: '100%',
                padding: '12px',
                border: `2px solid ${colors.border}`,
                borderRadius: '5px',
                backgroundColor: colors.background,
                color: colors.text
              }}
              placeholder="Введите пароль"
            />
          </div>
          
          {error && (
            <div style={{ 
              backgroundColor: colors.error + '20', 
              color: colors.error,
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '12px',
              background: loading 
                ? colors.textSecondary 
                : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        
        <div style={{ 
          marginTop: '30px',
          padding: '15px',
          backgroundColor: colors.background, 
          color: colors.textSecondary,
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <h4 style={{ marginBottom: '10px', color: colors.text }}>Тестовые аккаунты:</h4>
          <p style={{ margin: '5px 0' }}><strong>admin</strong> / admin123</p>
          <p style={{ margin: '5px 0' }}><strong>manager</strong> / manager123</p>
          <p style={{ margin: '5px 0' }}><strong>user</strong> / user123</p>
        </div>
        
        <div style={{ 
          marginTop: '20px',
          padding: '10px',
          backgroundColor: colors.background + '80', 
          color: colors.textSecondary,
          borderRadius: '5px',
          textAlign: 'center',
          fontSize: '12px'
        }}>
        </div>
      </div>
    </div>
  );
};

export default Login;