import { 
  SET_PRODUCTS, 
  ADD_PRODUCT, 
  UPDATE_PRODUCT, 
  DELETE_PRODUCT,
  EDIT_PRODUCT 
} from '../actions/productActions';


const initialProducts = [
  {
    id: 1,
    name: 'sdsdsdsdd',
    category: 'Компьютеры',
    price: 5400,
    stock: 1,
    description: 'Мощный игровой компьютер с RTX 4080, Intel i9-13900K, 32GB RAM',
    image: 'https://via.placeholder.com/300x200?text=ASUS+ROG'
  },
  {
    id: 2,
    name: 'Монитор Samsung Odyssey G7',
    category: 'Мониторы',
    price: 1850,
    stock: 8,
    description: 'Игровой монитор 27" 240Hz, QLED, изогнутый',
    image: 'https://via.placeholder.com/300x200?text=Samsung+Odyssey'
  },
  {
    id: 3,
    name: 'Механическая клавиатура Logitech G Pro',
    category: 'Периферия',
    price: 420,
    stock: 15,
    description: 'Механическая клавиатура с RGB подсветкой, переключателями GX Blue',
    image: 'https://via.placeholder.com/300x200?text=Logitech+Keyboard'
  }
];

const initialState = {
  products: initialProducts,
  editingProduct: null
};


const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        editingProduct: null
      };
    
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    
    case EDIT_PRODUCT:
      return {
        ...state,
        editingProduct: action.payload
      };
    
    default:
      return state;
  }
};

export default productReducer;