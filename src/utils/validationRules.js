// Утилиты для валидации

export const validationRules = {
    // Проверка обязательности
    required: (value) => {
      if (value === null || value === undefined || value === '') {
        return 'Это поле обязательно для заполнения';
      }
      return '';
    },
    
    // Проверка цены
    price: (value) => {
      if (!value && value !== 0) return 'Введите цену';
      
      const num = parseFloat(value);
      
      if (isNaN(num)) return 'Цена должна быть числом';
      if (num <= 0) return 'Цена должна быть больше 0';
      if (num > 1000000) return 'Цена не должна превышать 1,000,000 BYN';
      if (num.toString().split('.')[1]?.length > 2) {
        return 'Максимум 2 знака после запятой';
      }
      return '';
    },
    
    // Проверка количества
    stock: (value) => {
      if (!value && value !== 0) return 'Введите количество';
      
      const num = parseInt(value, 10);
      
      if (isNaN(num)) return 'Количество должно быть числом';
      if (num < 0) return 'Количество не может быть отрицательным';
      if (num > 10000) return 'Количество не должно превышать 10,000';
      if (!Number.isInteger(num)) return 'Введите целое число';
      return '';
    },
    
    // Проверка целого числа
    integer: (value) => {
      if (!value && value !== 0) return '';
      const num = parseInt(value, 10);
      if (isNaN(num)) return 'Введите целое число';
      if (!Number.isInteger(num)) return 'Введите целое число';
      return '';
    },
    
    // Проверка положительного числа
    positive: (value) => {
      if (!value && value !== 0) return '';
      const num = parseFloat(value);
      if (isNaN(num)) return 'Введите число';
      if (num <= 0) return 'Значение должно быть больше 0';
      return '';
    },
    
    // Проверка минимальной длины
    minLength: (min) => (value) => {
      if (!value) return '';
      if (value.length < min) return `Минимум ${min} символов`;
      return '';
    },
    
    // Проверка максимальной длины
    maxLength: (max) => (value) => {
      if (!value) return '';
      if (value.length > max) return `Максимум ${max} символов`;
      return '';
    },
    
    // Проверка email
    email: (value) => {
      if (!value) return '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Неверный формат email';
      return '';
    },
    
    // Проверка URL
    url: (value) => {
      if (!value) return '';
      try {
        new URL(value);
        return '';
      } catch {
        return 'Неверный формат URL';
      }
    }
  };
  
  // Валидация формы
  export const validateForm = (values, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(fieldName => {
      const fieldRules = rules[fieldName];
      const value = values[fieldName];
      
      for (const rule of fieldRules) {
        let error = '';
        
        if (typeof rule === 'string') {
          error = validationRules[rule] ? validationRules[rule](value) : '';
        } else if (typeof rule === 'function') {
          error = rule(value);
        } else if (typeof rule === 'object' && rule.type) {
          const validator = validationRules[rule.type];
          if (validator) {
            error = typeof rule.value !== 'undefined' 
              ? validator(rule.value)(value)
              : validator(value);
          }
        }
        
        if (error) {
          errors[fieldName] = error;
          break;
        }
      }
    });
    
    return errors;
  };
  
  // Проверка валидности формы
  export const isFormValid = (errors) => {
    return Object.keys(errors).length === 0;
  };