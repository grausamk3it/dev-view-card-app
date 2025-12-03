// Action Types
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

// Action Creators
export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId
});

export const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product
});
