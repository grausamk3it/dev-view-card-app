import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  InputAdornment, 
  IconButton, 
  Tooltip,
  Alert
} from '@mui/material';
import { 
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const ValidatedTextField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  validation = {},
  helperText = '',
  fullWidth = true,
  disabled = false,
  ...props
}) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [showError, setShowError] = useState(false);

  // Правила валидации
  const validators = {
    required: (val) => {
      if (required && (!val || val.toString().trim() === '')) {
        return 'Это поле обязательно для заполнения';
      }
      return '';
    },
    
    price: (val) => {
      if (!val && val !== 0) return '';
      
      const num = parseFloat(val);
      
      if (isNaN(num)) return 'Введите число';
      if (num <= 0) return 'Цена должна быть больше 0';
      if (num > 1000000) return 'Цена не должна превышать 1,000,000 BYN';
      if (num.toString().split('.')[1]?.length > 2) {
        return 'Максимум 2 знака после запятой';
      }
      return '';
    },
    
    stock: (val) => {
      if (!val && val !== 0) return '';
      
      const num = parseInt(val, 10);
      
      if (isNaN(num)) return 'Введите целое число';
      if (num < 0) return 'Количество не может быть отрицательным';
      if (num > 10000) return 'Количество не должно превышать 10,000';
      if (!Number.isInteger(num)) return 'Введите целое число';
      return '';
    },
    
    integer: (val) => {
      if (!val && val !== 0) return '';
      const num = parseInt(val, 10);
      if (isNaN(num)) return 'Введите целое число';
      if (!Number.isInteger(num)) return 'Введите целое число';
      return '';
    },
    
    positive: (val) => {
      if (!val && val !== 0) return '';
      const num = parseFloat(val);
      if (isNaN(num)) return 'Введите число';
      if (num <= 0) return 'Значение должно быть больше 0';
      return '';
    }
  };

  // Валидация значения
  const validate = (val) => {
    let errorMessage = '';
    
    // Применяем все указанные валидаторы
    Object.keys(validation).forEach(validatorName => {
      if (validators[validatorName]) {
        const validatorError = validators[validatorName](val);
        if (validatorError && !errorMessage) {
          errorMessage = validatorError;
        }
      }
    });
    
    // Проверяем обязательность
    if (required && validators.required) {
      const requiredError = validators.required(val);
      if (requiredError && !errorMessage) {
        errorMessage = requiredError;
      }
    }
    
    return errorMessage;
  };

  // Валидация при изменении значения
  useEffect(() => {
    if (touched) {
      const errorMessage = validate(value);
      setError(errorMessage);
      setShowError(!!errorMessage);
    }
  }, [value, touched, validation, required]);

  const handleBlur = () => {
    setTouched(true);
    const errorMessage = validate(value);
    setError(errorMessage);
    setShowError(!!errorMessage);
  };

  const handleChange = (e) => {
    let newValue = e.target.value;
    
    // Ограничение для числовых полей
    if (type === 'number') {
      // Разрешаем только цифры, точку и минус
      newValue = newValue.replace(/[^0-9.-]/g, '');
      
      // Только одна точка
      const parts = newValue.split('.');
      if (parts.length > 2) {
        newValue = parts[0] + '.' + parts.slice(1).join('');
      }
      
      // Для количества товаров убираем точку
      if (validation.stock || validation.integer) {
        newValue = newValue.replace('.', '');
      }
    }
    
    onChange({
      target: {
        name,
        value: newValue
      }
    });
  };

  // Форматирование отображения
  const formatDisplayValue = (val) => {
    if (val === '' || val === null || val === undefined) return '';
    
    if (validation.price) {
      // Форматируем цену с разделителями тысяч
      const num = parseFloat(val);
      if (!isNaN(num)) {
        return num.toLocaleString('ru-RU', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });
      }
    }
    
    return val;
  };

  return (
    <>
      <TextField
        label={label}
        name={name}
        value={formatDisplayValue(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type === 'number' ? 'text' : type} // Используем text для кастомной обработки
        required={required}
        error={showError}
        helperText={showError ? error : helperText}
        fullWidth={fullWidth}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {validation.price && (
                <Tooltip title="Белорусские рубли">
                  <span style={{ color: '#666', fontSize: '0.875rem' }}>BYN</span>
                </Tooltip>
              )}
              {validation.stock && (
                <Tooltip title="Количество в штуках">
                  <span style={{ color: '#666', fontSize: '0.875rem' }}>шт.</span>
                </Tooltip>
              )}
              {touched && (
                <IconButton size="small" edge="end" disabled>
                  {showError ? (
                    <ErrorIcon color="error" fontSize="small" />
                  ) : (
                    <CheckCircleIcon color="success" fontSize="small" />
                  )}
                </IconButton>
              )}
            </InputAdornment>
          ),
          ...props.InputProps
        }}
        {...props}
      />

      {/* Подсказки для валидации */}
      {validation.price && !touched && (
        <Alert 
          severity="info" 
          icon={<InfoIcon fontSize="small" />}
          sx={{ mt: 1, fontSize: '0.75rem', py: 0 }}
        >
          Формат: число с максимум 2 знаками после запятой
        </Alert>
      )}

      {validation.stock && !touched && (
        <Alert 
          severity="info" 
          icon={<InfoIcon fontSize="small" />}
          sx={{ mt: 1, fontSize: '0.75rem', py: 0 }}
        >
          Введите целое неотрицательное число
        </Alert>
      )}
    </>
  );
};

export default ValidatedTextField;