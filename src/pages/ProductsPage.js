import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  deleteProduct, 
  editProduct, 
  addProduct, 
  updateProduct 
} from '../redux/actions/productActions';

// MUI компоненты
import { 
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tooltip
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ViewList as ViewListIcon,
  GridView as GridViewIcon,
  Error as ErrorIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

// Временная замена ValidatedTextField
const ValidatedTextField = ({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  required = false,
  validation = {},
  helperText = '',
  name,
  ...props 
}) => {
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  
  const validateInput = (value) => {
    const numValue = parseFloat(value);
    
    // Сброс ошибок
    setError('');
    setWarning('');
    
    // Проверка на обязательность
    if (required && !value) {
      setError('Это поле обязательно для заполнения');
      return false;
    }
    
    // Валидация цены
    if (name === 'price' && value) {
      if (isNaN(numValue)) {
        setError('Введите число');
        return false;
      }
      if (numValue <= 0) {
        setError('Цена должна быть больше 0');
        return false;
      }
      if (numValue > 1000000) {
        setWarning('Цена слишком высокая');
      }
    }
    
    // Валидация количества
    if (name === 'stock' && value !== '') {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        setError('Введите целое число');
        return false;
      }
      if (intValue < 0) {
        setError('Количество не может быть отрицательным');
        return false;
      }
      if (!Number.isInteger(intValue)) {
        setError('Введите целое число');
        return false;
      }
      if (intValue > 10000) {
        setWarning('Количество слишком большое');
      }
      if (intValue < 10) {
        setWarning('Мало на складе');
      }
    }
    
    return true;
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);
    validateInput(newValue);
  };
  
  const handleBlur = () => {
    validateInput(value);
  };
  
  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
        name={name}
        required={required}
        error={!!error}
        helperText={error || warning || helperText}
        fullWidth
        variant="outlined"
        {...props}
      />
      {(error || warning) && (
        <Box sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
          <Tooltip title={error || warning}>
            {error ? (
              <ErrorIcon color="error" fontSize="small" />
            ) : (
              <WarningIcon color="warning" fontSize="small" />
            )}
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

const ProductsPage = ({ user, onLogout, theme }) => {
  const dispatch = useDispatch();
  
  // Получаем данные из Redux store
  const { products, editingProduct } = useSelector(state => state.products);
  
  const [viewMode, setViewMode] = useState('table');
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // Состояние для модалки удаления
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  // Функция открытия модалки удаления
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  // Функция подтверждения удаления
  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  // Функция закрытия модалки удаления
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // Функция редактирования товара
  const handleEdit = (product) => {
    // Заполняем форму данными редактируемого товара
    setFormData({
      name: product.name || '',
      category: product.category || '',
      price: product.price?.toString() || '',
      stock: product.stock?.toString() || '',
      description: product.description || '',
      image: product.image || ''
    });
    
    // Устанавливаем режим редактирования
    dispatch(editProduct(product));
    setShowForm(true);
  };

  // Функция валидации всей формы
  const validateForm = () => {
    const errors = {};
    
    // Валидация названия
    if (!formData.name.trim()) {
      errors.name = 'Название товара обязательно';
    }
    
    // Валидация категории
    if (!formData.category) {
      errors.category = 'Выберите категорию';
    }
    
    // Валидация цены
    const priceNum = parseFloat(formData.price);
    if (!formData.price || formData.price.trim() === '') {
      errors.price = 'Цена обязательна';
    } else if (isNaN(priceNum)) {
      errors.price = 'Цена должна быть числом';
    } else if (priceNum <= 0) {
      errors.price = 'Цена должна быть больше 0';
    } else if (priceNum > 1000000) {
      errors.price = 'Цена не должна превышать 1,000,000 BYN';
    }
    
    // Валидация количества
    const stockNum = parseInt(formData.stock, 10);
    if (!formData.stock && formData.stock !== 0) {
      errors.stock = 'Количество обязательно';
    } else if (isNaN(stockNum)) {
      errors.stock = 'Количество должно быть числом';
    } else if (stockNum < 0) {
      errors.stock = 'Количество не может быть отрицательным';
    } else if (!Number.isInteger(stockNum)) {
      errors.stock = 'Введите целое число';
    } else if (stockNum > 10000) {
      errors.stock = 'Количество не должно превышать 10,000';
    }
    
    // Валидация описания
    if (!formData.description.trim()) {
      errors.description = 'Описание обязательно';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = () => {
    setFormSubmitted(true);
    
    if (!validateForm()) {
      return; // Не продолжаем если есть ошибки
    }
    
    // Подготовка данных
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      id: editingProduct ? editingProduct.id : Date.now()
    };
    
    if (editingProduct) {
      dispatch(updateProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }
    
    // Сброс формы
    handleCancelForm();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormSubmitted(false);
    setFormErrors({});
    dispatch(editProduct(null)); // Сбрасываем редактирование
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      image: ''
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const categories = ['Компьютеры', 'Ноутбуки', 'Мониторы', 'Периферия', 'Комплектующие', 'Аксессуары'];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Шапка */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3,
          background: `linear-gradient(135deg, ${theme === 'light' ? '#667eea' : '#7c93e0'} 0%, ${theme === 'light' ? '#764ba2' : '#9b6bd4'} 100%)`,
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Button 
                component={Link} 
                to="/dashboard" 
                variant="outlined"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                ← Назад
              </Button>
              <Typography variant="h4" component="h1">
                Управление товарами
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body1">
                {user.name}
              </Typography>
              <Button 
                variant="outlined" 
                onClick={onLogout}
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Выйти
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Основной контент */}
      <Container maxWidth="lg">
        {/* Контролы */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'background.paper'
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={() => setViewMode('table')}
              color={viewMode === 'table' ? 'primary' : 'default'}
            >
              <ViewListIcon />
            </IconButton>
            <IconButton
              onClick={() => setViewMode('cards')}
              color={viewMode === 'cards' ? 'primary' : 'default'}
            >
              <GridViewIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {viewMode === 'table' ? 'Таблица' : 'Карточки'}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              dispatch(editProduct(null)); // Сбрасываем редактирование
              setShowForm(true);
            }}
          >
            Добавить товар
          </Button>
        </Paper>

        {/* Таблица товаров */}
        {viewMode === 'table' ? (
          <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Название</strong></TableCell>
                  <TableCell><strong>Категория</strong></TableCell>
                  <TableCell><strong>Цена</strong></TableCell>
                  <TableCell><strong>На складе</strong></TableCell>
                  <TableCell><strong>Действия</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={product.category} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography color="success.main" fontWeight="bold">
                          {formatPrice(product.price)} BYN
                        </Typography>
                        {product.price <= 0 && (
                          <Tooltip title="Некорректная цена">
                            <ErrorIcon color="error" fontSize="small" />
                          </Tooltip>
                        )}
                        {product.price > 1000000 && (
                          <Tooltip title="Цена слишком высокая">
                            <WarningIcon color="warning" fontSize="small" />
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography color={product.stock < 5 ? 'error' : 'success'}>
                          {product.stock} шт.
                        </Typography>
                        {product.stock < 10 && product.stock > 0 && (
                          <Tooltip title="Мало на складе">
                            <WarningIcon color="warning" fontSize="small" />
                          </Tooltip>
                        )}
                        {product.stock === 0 && (
                          <Tooltip title="Нет в наличии">
                            <ErrorIcon color="error" fontSize="small" />
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(product)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteClick(product)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          /* Карточки товаров */
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardContent>
                    <Box 
                      sx={{ 
                        height: 140, 
                        bgcolor: 'grey.100',
                        mb: 2,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="h4" color="text.secondary">
                        {product.category === 'Компьютеры' && '🖥️'}
                        {product.category === 'Мониторы' && '🖥️'}
                        {product.category === 'Периферия' && '⌨️'}
                        {product.category === 'Комплектующие' && '💻'}
                        {product.category === 'Аксессуары' && '🎧'}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" component="h3" gutterBottom>
                      {product.name}
                    </Typography>
                    
                    <Chip 
                      label={product.category} 
                      size="small" 
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6" color="success.main">
                          {formatPrice(product.price)} BYN
                        </Typography>
                        {product.price <= 0 && (
                          <Tooltip title="Некорректная цена">
                            <ErrorIcon color="error" fontSize="small" />
                          </Tooltip>
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography 
                          variant="body2" 
                          color={product.stock < 5 ? 'error' : 'text.secondary'}
                        >
                          В наличии: {product.stock} шт.
                        </Typography>
                        {product.stock < 10 && product.stock > 0 && (
                          <Tooltip title="Мало на складе">
                            <WarningIcon color="warning" fontSize="small" />
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(product)}
                    >
                      Редактировать
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(product)}
                      color="error"
                    >
                      Удалить
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Диалог добавления/редактирования товара */}
      <Dialog open={showForm} onClose={handleCancelForm} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ValidatedTextField
              label="Название товара"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              helperText="Обязательное поле"
            />
            
            <TextField
              select
              label="Категория"
              fullWidth
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
              error={formSubmitted && !formData.category}
              helperText={formSubmitted && !formData.category ? 'Выберите категорию' : ''}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            
            <ValidatedTextField
              label="Цена (BYN)"
              name="price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              type="number"
              required
              helperText="Цена в белорусских рублях"
            />
            
            <ValidatedTextField
              label="Количество на складе"
              name="stock"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              type="number"
              required
              helperText="Целое неотрицательное число"
            />
            
            <ValidatedTextField
              label="Описание"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              multiline
              rows={3}
              required
              helperText="Обязательное поле"
            />
            
            <TextField
              label="URL изображения"
              fullWidth
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelForm}>Отмена</Button>
          <Button 
            onClick={handleAddProduct} 
            variant="contained"
          >
            {editingProduct ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Модальное окно подтверждения удаления */}
      <Dialog
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="delete-dialog-title">
          <Typography variant="h6" fontWeight="bold" color="error">
            <DeleteIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Подтверждение удаления
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="body1" paragraph>
              Вы уверены, что хотите удалить товар?
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 2, 
                bgcolor: 'grey.50',
                borderLeft: '4px solid',
                borderColor: 'error.main'
              }}
            >
              <Typography variant="h6" color="primary" fontWeight="bold">
                {productToDelete?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {productToDelete?.id} | Категория: {productToDelete?.category}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Цена: <strong>{productToDelete?.price && formatPrice(productToDelete.price)} BYN</strong>
              </Typography>
              <Typography variant="body2">
                На складе: <strong>{productToDelete?.stock} шт.</strong>
              </Typography>
            </Paper>
            
            <Typography variant="caption" color="error" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorIcon fontSize="small" />
              ⚠️ Это действие нельзя отменить. Все данные о товаре будут удалены.
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCloseDeleteModal} 
            variant="outlined"
            sx={{ mr: 1 }}
            fullWidth
          >
            Отмена
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            startIcon={<DeleteIcon />}
            fullWidth
          >
            Удалить товар
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;