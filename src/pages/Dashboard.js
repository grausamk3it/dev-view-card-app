import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import './Dashboard.css';

const Dashboard = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🖥️ Магазин компьютерной техники</h1>
          <div className="header-controls">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="user-info">
              <span>Добро пожаловать, {user.name}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Панель управления</h2>
          <p>Управление товарами компьютерной техники</p>
          <div className="currency-info">
            Все цены указаны в белорусских рублях (BYN)
          </div>
          <div className="theme-info">
            Текущая тема: <strong>{theme === 'light' ? 'Светлая' : 'Темная'}</strong>
          </div>
        </div>

        <div className="nav-cards">
          <Link to="/products" className="nav-card">
            <div className="card-icon">🖥️</div>
            <h3>Управление товарами</h3>
            <p>Просмотр, добавление и редактирование товаров</p>
          </Link>
          
          <div className="nav-card">
            <div className="card-icon">📊</div>
            <h3>Статистика продаж</h3>
            <p>Аналитика продаж и популярности товаров</p>
          </div>

          <div className="nav-card">
            <div className="card-icon">👥</div>
            <h3>Управление клиентами</h3>
            <p>База клиентов, история заказов</p>
          </div>

          <div className="nav-card">
            <div className="card-icon">📦</div>
            <h3>Заказы и доставка</h3>
            <p>Обработка заказов, отслеживание доставки</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;