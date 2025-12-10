import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Получаем пользователей из Redux store
  const { users } = useSelector(state => state.user);
  const { currentTheme, themes } = useSelector(state => state.theme);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const colors = themes[currentTheme].colors;

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Ищем пользователя в массиве из Redux store
      const user = users.find(u => 
        u.username === username && u.password === password
      );
      
      if (user) {
        // Диспатчим действие loginUser
        dispatch(loginUser(user));
        
        // Сохраняем в localStorage для persistence
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        
        navigate('/dashboard');
      } else {
        setError('Неверное имя пользователя или пароль');
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-container" style={{ 
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
    }}>
      <div className="login-form" style={{ 
        backgroundColor: colors.surface, 
        color: colors.text
      }}>
        <h2>Вход в систему</h2>
        <p className="subtitle" style={{ color: colors.textSecondary }}>
          Магазин компьютерной техники
        </p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label style={{ color: colors.text }}>Имя пользователя:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              style={{ 
                borderColor: colors.border,
                backgroundColor: colors.background,
                color: colors.text
              }}
              placeholder="Введите имя пользователя"
            />
          </div>
          
          <div className="form-group">
            <label style={{ color: colors.text }}>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={{ 
                borderColor: colors.border,
                backgroundColor: colors.background,
                color: colors.text
              }}
              placeholder="Введите пароль"
            />
          </div>
          
          {error && (
            <div className="error" style={{ 
              backgroundColor: colors.error + '20', 
              color: colors.error 
            }}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="login-btn"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;