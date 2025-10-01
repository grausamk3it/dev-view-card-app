import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🖥️ Магазин компьютерной техники</h1>
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
            <p>Просмотр, добавление, редактирование и удаление товаров компьютерной техники</p>
          </Link>

          <div className="nav-card">
            <div className="card-icon">📊</div>
            <h3>Статистика продаж</h3>
            <p>Аналитика продаж и популярности товаров, графики и отчеты</p>
          </div>

          <div className="nav-card">
            <div className="card-icon">👥</div>
            <h3>Управление клиентами</h3>
            <p>База клиентов, история заказов, персональные скидки</p>
          </div>

          <div className="nav-card">
            <div className="card-icon">📦</div>
            <h3>Заказы и доставка</h3>
            <p>Обработка заказов, отслеживание доставки, управление складом</p>
          </div>

          <div className="nav-card">
            <div className="card-icon">💰</div>
            <h3>Финансы</h3>
            <p>Учет доходов и расходов, финансовые отчеты, налоговая отчетность</p>
          </div>

          <div className="nav-card">
            <div className="card-icon">⚙️</div>
            <h3>Настройки</h3>
            <p>Настройки магазина, пользователи, права доступа, интеграции</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;