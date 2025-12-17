import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/actions/themeActions';
import MUIThemeToggle from '../components/MUIThemeToggle/MUIThemeToggle';

// MUI компоненты
import { 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardActions,
  Button,
  Box
} from '@mui/material';

const Dashboard = ({ user, onLogout, theme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Получаем продукты из Redux store
  const { products } = useSelector(state => state.products);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Шапка */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3,
          background: `linear-gradient(135deg, ${theme === 'light' ? '#667eea' : '#7c93e0'} 0%, ${theme === 'light' ? '#764ba2' : '#9b6bd4'} 100%)`,
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">
              🖥️ Магазин компьютерной техники
            </Typography>
            
            <Box display="flex" alignItems="center" gap={2}>
              <MUIThemeToggle 
                theme={theme}
                toggleTheme={handleToggleTheme}
              />
              
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body1">
                  Добро пожаловать, {user.name}!
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={onLogout}
                  sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Выйти
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Основной контент */}
      <Container maxWidth="lg">
        {/* Приветственная секция */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            mb: 4, 
            textAlign: 'center',
            bgcolor: 'background.paper'
          }}
        >
          <Typography variant="h3" component="h2" gutterBottom>
            Панель управления
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Управление товарами компьютерной техники
          </Typography>
          
          <Box mt={2}>
            <Typography variant="body1" color="text.secondary">
              Всего товаров в каталоге: <strong>{products.length}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Все цены указаны в белорусских рублях (BYN)
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Текущая тема: <strong>{theme === 'light' ? 'Светлая' : 'Темная'}</strong>
            </Typography>
          </Box>
        </Paper>

        {/* Карточки навигации */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h1" component="div" gutterBottom>
                  🖥️
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  Управление товарами
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Просмотр, добавление и редактирование товаров
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  component={Link} 
                  to="/products"
                  variant="contained"
                >
                  Перейти
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h1" component="div" gutterBottom>
                  📊
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  Статистика продаж
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Аналитика продаж и популярности товаров
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" disabled>
                  Скоро
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h1" component="div" gutterBottom>
                  👥
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  Управление клиентами
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  База клиентов, история заказов
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" disabled>
                  Скоро
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h1" component="div" gutterBottom>
                  📦
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  Заказы и доставка
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Обработка заказов, отслеживание доставки
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" disabled>
                  Скоро
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;