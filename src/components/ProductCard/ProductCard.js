import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="card-image">
        <img src={product.image} alt={product.name} />
        <div className="price-badge">{formatPrice(product.price)} BYN</div>
      </div>
      <div className="card-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-stock">В наличии: {product.stock} шт.</span>
        </div>
        <div className="card-actions">
          <button 
            className="edit-btn"
            onClick={() => onEdit(product)}
          >
            Редактировать
          </button>
          <button 
            className="delete-btn"
            onClick={() => onDelete(product.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;