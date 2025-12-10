import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/userActions';
import { setTheme } from './redux/actions/themeActions';
import Login from './components/Login/Login';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import './App.css';


function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {

    const savedUser = localStorage.getItem('currentUser');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (savedUser && isAuthenticated) {
      dispatch(setCurrentUser(JSON.parse(savedUser)));
    }

  
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  return null;
}


function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.user);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}


function PublicRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.user);
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}


function AppRoutes() {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  const { currentTheme, themes } = useSelector(state => state.theme);

 
  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  };

  return (
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
                themeColors={themes[currentTheme].colors}
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
                themeColors={themes[currentTheme].colors}
              />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;