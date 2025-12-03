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

const ProductsPage = ({ user, onLogout }) => {
  const dispatch = useDispatch();
  const { products, editingProduct } = useSelector(state => state.products);
  const [viewMode, setViewMode] = useState('table');
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEdit = (product) => {
    dispatch(editProduct(product));
    setShowForm(true);
  };

  const handleAddProduct = (newProduct) => {
    if (editingProduct) {
      // Update existing product
      dispatch(updateProduct({ ...newProduct, id: editingProduct.id }));
    } else {
      // Add new product
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