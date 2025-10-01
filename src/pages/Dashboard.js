import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Магазин компьютерной техники</h1>
          <div className="user-info">
            <span>Добро пожаловать, {user.name}!</span>
            <button onClick={onLogout} className="logout-button">
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Панель управления</h2>
          <p>Управление товарами компьютерной техники</p>
        </div>

        <div className="navigation-cards">
          <Link to="/products" className="nav-card">
            <div className="card-icon">🖥️</div>
            <h3>Управление товарами</h3>
            <p>Просмотр, добавление и редактирование товаров</p>
          </Link>

          <div className="nav-card">
            <div className="card-icon">📊</div>
            <h3>Статистика</h3>
            <p>Аналитика продаж и популярности товаров</p>
          </div>

          <div className="nav-card">
            <div className="card-icon">👥</div>
            <h3>Клиенты</h3>
            <p>Управление клиентской базой</p>
          </div>

          <div className="nav-card">
            <div className="card-icon">📦</div>
            <h3>Заказы</h3>
            <p>Обработка и отслеживание заказов</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;