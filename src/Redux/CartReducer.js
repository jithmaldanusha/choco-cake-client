import { SET_CART } from './cartValueAction';

const initialState = {
  value: '',
};

const myReducerCart = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default myReducerCart;
