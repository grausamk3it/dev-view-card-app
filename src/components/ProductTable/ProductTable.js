import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
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
              <td>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography 
                    fontWeight="bold"
                    style={{ color: product.price <= 0 ? colors.error || '#d32f2f' : colors.success || '#2c5530' }}
                  >
                    {formatPrice(product.price)} BYN
                  </Typography>
                  {product.price <= 0 && (
                    <Tooltip title="Некорректная цена">
                      <ErrorIcon 
                        fontSize="small" 
                        style={{ color: colors.error || '#d32f2f' }} 
                      />
                    </Tooltip>
                  )}
                  {product.price > 1000000 && (
                    <Tooltip title="Цена слишком высокая">
                      <WarningIcon 
                        fontSize="small" 
                        style={{ color: colors.warning || '#ed6c02' }} 
                      />
                    </Tooltip>
                  )}
                </Box>
              </td>
              <td>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography 
                    style={{ color: product.stock < 5 ? colors.error || '#d32f2f' : colors.text }}
                  >
                    {product.stock} шт.
                  </Typography>
                  {product.stock < 10 && product.stock > 0 && (
                    <Tooltip title="Мало на складе">
                      <WarningIcon 
                        fontSize="small" 
                        style={{ color: colors.warning || '#ed6c02' }} 
                      />
                    </Tooltip>
                  )}
                  {product.stock === 0 && (
                    <Tooltip title="Нет в наличии">
                      <ErrorIcon 
                        fontSize="small" 
                        style={{ color: colors.error || '#d32f2f' }} 
                      />
                    </Tooltip>
                  )}
                </Box>
              </td>
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