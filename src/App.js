import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/userActions';
import { setTheme } from './redux/actions/themeActions';
import { lightTheme, darkTheme } from './theme/muiTheme';
import Login from './components/Login/Login';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';

// Компонент для инициализации из localStorage
function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Восстанавливаем пользователя из localStorage
    const savedUser = localStorage.getItem('currentUser');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (savedUser && isAuthenticated) {
      dispatch(setCurrentUser(JSON.parse(savedUser)));
    }

    // Восстанавливаем тему из localStorage
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  return null;
}

// Компонент для защищенных маршрутов
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.user);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Компонент для публичных маршрутов
function PublicRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.user);
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

// Основной компонент маршрутизации
function AppRoutes() {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  const { currentTheme } = useSelector(state => state.theme);

  // Выбираем MUI тему на основе currentTheme
  const muiTheme = currentTheme === 'light' ? lightTheme : darkTheme;

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <AppInitializer />
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard 
                  user={currentUser}
                  onLogout={handleLogout}
                  theme={currentTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <ProductsPage 
                  user={currentUser}
                  onLogout={handleLogout}
                  theme={currentTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

// Главный компонент с Provider
function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;