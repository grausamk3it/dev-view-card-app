import React from 'react';
import './ProductTable.css';

const ProductTable = ({ products, onDelete, onEdit }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>На складе</th>
            <th>Описание</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td className="price-cell">{formatPrice(product.price)} BYN</td>
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