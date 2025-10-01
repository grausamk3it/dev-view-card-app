import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductTable from '../components/ProductTable/ProductTable';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductForm from '../components/ProductForm/ProductForm';
import './ProductsPage.css';

const initialProducts = [
  {
    id: 1,
    name: 'Игровой компьютер ASUS ROG',
    category: 'Компьютеры',
    price: 5200,
    stock: 5,
    description: 'Мощный игровой компьютер с RTX 4080, Intel i9-13900K, 32GB RAM',
    image: 'https://via.placeholder.com/300x200?text=ASUS+ROG'
  },
  {
    id: 2,
    name: 'Монитор Samsung Odyssey G7',
    category: 'Мониторы',
    price: 1850,
    stock: 8,
    description: 'Игровой монитор 27" 240Hz, QLED, изогнутый',
    image: 'https://via.placeholder.com/300x200?text=Samsung+Odyssey'
  },
  {
    id: 3,
    name: 'Механическая клавиатура Logitech G Pro',
    category: 'Периферия',
    price: 420,
    stock: 15,
    description: 'Механическая клавиатура с RGB подсветкой, переключателями GX Blue',
    image: 'https://via.placeholder.com/300x200?text=Logitech+Keyboard'
  },
  {
    id: 4,
    name: 'Игровая мышь Razer Viper V2 Pro',
    category: 'Периферия',
    price: 280,
    stock: 12,
    description: 'Беспроводная игровая мышь, 58g, сенсор Focus Pro 30K',
    image: 'https://via.placeholder.com/300x200?text=Razer+Viper'
  },
  {
    id: 5,
    name: 'Видеокарта NVIDIA RTX 4070',
    category: 'Комплектующие',
    price: 2650,
    stock: 3,
    description: '12GB GDDR6X, DLSS 3, ray tracing',
    image: 'https://via.placeholder.com/300x200?text=RTX+4070'
  },
  {
    id: 6,
    name: 'Процессор Intel Core i7-13700K',
    category: 'Комплектующие',
    price: 1250,
    stock: 7,
    description: '16 ядер, 24 потока, тактовая частота до 5.4 GHz',
    image: 'https://via.placeholder.com/300x200?text=Intel+i7'
  },
  {
    id: 7,
    name: 'SSD накопитель Samsung 980 Pro',
    category: 'Комплектующие',
    price: 320,
    stock: 25,
    description: '1TB NVMe M.2, скорость чтения до 7000 MB/s',
    image: 'https://via.placeholder.com/300x200?text=Samsung+SSD'
  },
  {
    id: 8,
    name: 'Игровое кресло DXRacer Formula',
    category: 'Аксессуары',
    price: 680,
    stock: 4,
    description: 'Эргономичное игровое кресло с поддержкой поясницы',
    image: 'https://via.placeholder.com/300x200?text=Gaming+Chair'
  }
];

const ProductsPage = ({ user, onLogout }) => {
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState('table');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddProduct = (newProduct) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...newProduct, id: editingProduct.id }
          : p
      ));
    } else {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <div className="header-content">
          <Link to="/dashboard" className="back-button">← Назад</Link>
          <h1>Управление товарами</h1>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-button">
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="products-main">
        <div className="products-controls">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Таблица
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
            >
              Карточки
            </button>
          </div>

          <button 
            className="add-product-btn"
            onClick={() => setShowForm(true)}
          >
            + Добавить товар
          </button>
        </div>

        {showForm && (
          <ProductForm 
            product={editingProduct}
            onSubmit={handleAddProduct}
            onCancel={handleCancelForm}
          />
        )}

        {viewMode === 'table' ? (
          <ProductTable 
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;