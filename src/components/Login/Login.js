import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

// MUI компоненты
import { 
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Card,
  CardContent
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Получаем пользователей из Redux store
  const { users } = useSelector(state => state.user);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    setError('');

    setTimeout(() => {
      const user = users.find(u => 
        u.username === username && u.password === password
      );
      
      if (user) {
        dispatch(loginUser(user));
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
    <Container 
      maxWidth="sm" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Вход в систему
          </Typography>
          
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            Магазин компьютерной техники
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </Box>

          <Paper 
            variant="outlined" 
            sx={{ 
              mt: 3, 
              p: 2,
              bgcolor: 'background.default'
            }}
          >
            <Typography variant="subtitle2" align="center" gutterBottom>
              Тестовые аккаунты:
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              <strong>admin</strong> / admin123
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              <strong>manager</strong> / manager123
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              <strong>user</strong> / user123
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;