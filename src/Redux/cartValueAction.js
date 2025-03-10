// actions.js
export const SET_CART = 'SET_VALUE';

export const setCart = (value) => ({
  type: SET_CART,
  payload: value,
});