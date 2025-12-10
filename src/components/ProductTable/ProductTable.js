import React from 'react';
import './ProductTable.css';

const ProductTable = ({ products, onDelete, onEdit, themeColors }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const colors = themeColors || {};

  return (
    <div className="product-table" style={{ 
      backgroundColor: colors.surface,
      color: colors.text
    }}>
      <table>
        <thead>
          <tr style={{ backgroundColor: colors.background }}>
            <th style={{ color: colors.text }}>ID</th>
            <th style={{ color: colors.text }}>Название</th>
            <th style={{ color: colors.text }}>Категория</th>
            <th style={{ color: colors.text }}>Цена</th>
            <th style={{ color: colors.text }}>На складе</th>
            <th style={{ color: colors.text }}>Описание</th>
            <th style={{ color: colors.text }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr 
              key={product.id} 
              className={index % 2 === 0 ? 'even' : 'odd'}
              style={{ 
                backgroundColor: index % 2 === 0 
                  ? (colors.background || '#fafafa') 
                  : (colors.surface || 'white'),
                color: colors.text
              }}
            >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td className="price-cell" style={{ color: colors.success || '#2c5530' }}>
                {formatPrice(product.price)} BYN
              </td>
              <td>{product.stock} шт.</td>
              <td>{product.description}</td>
              <td className="actions">
                <button 
                  className="edit-btn"
                  onClick={() => onEdit(product)}
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(product.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;