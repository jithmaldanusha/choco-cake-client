// reducer.js
import { SET_PROD } from './ItemDetailAction';

const initialState = {
  value: '',
};

const myReducerProd = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default myReducerProd;
