import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  deleteProduct, 
  editProduct, 
  addProduct, 
  updateProduct 
} from '../redux/actions/productActions';
import ProductTable from '../components/ProductTable/ProductTable';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductForm from '../components/ProductForm/ProductForm';
import './ProductsPage.css';

const ProductsPage = ({ user, onLogout, theme, themeColors }) => {
  const dispatch = useDispatch();
  
  // Получаем данные из Redux store
  const { products, editingProduct } = useSelector(state => state.products);
  
  const [viewMode, setViewMode] = useState('table');
  const [showForm, setShowForm] = useState(false);

  const colors = themeColors;

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEdit = (product) => {
    dispatch(editProduct(product));
    setShowForm(true);
  };

  const handleAddProduct = (newProduct) => {
    if (editingProduct) {
     
      dispatch(updateProduct({ ...newProduct, id: editingProduct.id }));
    } else {
      
      dispatch(addProduct({ ...newProduct, id: Date.now() }));
    }
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    dispatch(editProduct(null));
  };

  return (
    <div className="products-page">
      <header className="products-header" style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
      }}>
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

      <main className="products-main" style={{ backgroundColor: colors.background }}>
        <div className="products-controls">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              style={{
                backgroundColor: viewMode === 'table' ? colors.surface : 'transparent',
                color: viewMode === 'table' ? colors.text : colors.textSecondary
              }}
            >
              Таблица
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              style={{
                backgroundColor: viewMode === 'cards' ? colors.surface : 'transparent',
                color: viewMode === 'cards' ? colors.text : colors.textSecondary
              }}
            >
              Карточки
            </button>
          </div>

          <button 
            className="add-product-btn"
            onClick={() => setShowForm(true)}
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
            }}
          >
            + Добавить товар
          </button>
        </div>

        {showForm && (
          <ProductForm 
            product={editingProduct}
            onSubmit={handleAddProduct}
            onCancel={handleCancelForm}
            themeColors={colors}
          />
        )}

        {viewMode === 'table' ? (
          <ProductTable 
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
            themeColors={colors}
          />
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
                themeColors={colors}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;