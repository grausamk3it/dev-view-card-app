import React, { useState, useEffect } from 'react';
import './ProductForm.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image: product.image
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form">
        <h2>{product ? 'Редактировать товар' : 'Добавить новый товар'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название товара:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Категория:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Выберите категорию</option>
              <option value="Компьютеры">Компьютеры</option>
              <option value="Ноутбуки">Ноутбуки</option>
              <option value="Мониторы">Мониторы</option>
              <option value="Периферия">Периферия</option>
              <option value="Комплектующие">Комплектующие</option>
              <option value="Аксессуары">Аксессуары</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Цена (BYN):</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                required
              />
              <div className="currency-note">Цена указывается в белорусских рублях</div>
            </div>

            <div className="form-group">
              <label>Количество на складе:</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>URL изображения:</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Отмена
            </button>
            <button type="submit" className="submit-btn">
              {product ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;