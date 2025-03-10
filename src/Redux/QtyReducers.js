// reducer.js
import { SET_QTY } from './QtyAction';

const initialState = {
  value: '',
};

const myReducerQty = (state = initialState, action) => {
  switch (action.type) {
    case SET_QTY:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default myReducerQty;
