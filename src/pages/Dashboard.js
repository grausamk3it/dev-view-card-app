import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/actions/themeActions';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import './Dashboard.css';

const Dashboard = ({ user, onLogout, theme, themeColors }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector(state => state.products);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const colors = themeColors;

  return (
    <div className="dashboard">
      <header className="dashboard-header" style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
      }}>
        <div className="header-content">
          <h1>🖥️ Магазин компьютерной техники</h1>
          <div className="header-controls">
            <ThemeToggle 
              theme={theme} 
              toggleTheme={handleToggleTheme} 
              colors={colors}
            />
            <div className="user-info">
              <span>Добро пожаловать, {user.name}!</span>
              <button onClick={onLogout} className="logout-btn">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main" style={{ backgroundColor: colors.background }}>
        <div className="welcome-section" style={{ 
          backgroundColor: colors.surface, 
          color: colors.text,
          border: `1px solid ${colors.border}`
        }}>
          <h2>Панель управления</h2>
          <p>Управление товарами компьютерной техники</p>
          <div className="stats-info">
            <p>Всего товаров в каталоге: <strong>{products.length}</strong></p>
          </div>
          <div className="currency-info" style={{ color: colors.textSecondary }}>
            Все цены указаны в белорусских рублях (BYN)
          </div>
          <div className="theme-info" style={{ color: colors.textSecondary, marginTop: '10px' }}>
            Текущая тема: <strong>{theme === 'light' ? 'Светлая' : 'Темная'}</strong>
          </div>
        </div>

        <div className="nav-cards">
          <Link to="/products" className="nav-card" style={{ 
            backgroundColor: colors.surface, 
            color: colors.text,
            border: `1px solid ${colors.border}`
          }}>
            <div className="card-icon">🖥️</div>
            <h3>Управление товарами</h3>
            <p style={{ color: colors.textSecondary }}>Просмотр, добавление и редактирование товаров</p>
          </Link>
          
          <div className="nav-card" style={{ 
            backgroundColor: colors.surface, 
            color: colors.text,
            border: `1px solid ${colors.border}`
          }}>
            <div className="card-icon">📊</div>
            <h3>Статистика продаж</h3>
            <p style={{ color: colors.textSecondary }}>Аналитика продаж и популярности товаров</p>
          </div>

          <div className="nav-card" style={{ 
            backgroundColor: colors.surface, 
            color: colors.text,
            border: `1px solid ${colors.border}`
          }}>
            <div className="card-icon">👥</div>
            <h3>Управление клиентами</h3>
            <p style={{ color: colors.textSecondary }}>База клиентов, история заказов</p>
          </div>

          <div className="nav-card" style={{ 
            backgroundColor: colors.surface, 
            color: colors.text,
            border: `1px solid ${colors.border}`
          }}>
            <div className="card-icon">📦</div>
            <h3>Заказы и доставка</h3>
            <p style={{ color: colors.textSecondary }}>Обработка заказов, отслеживание доставки</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;