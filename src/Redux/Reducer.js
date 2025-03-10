// reducer.js
import { SET_VALUE } from './Action';

const initialState = {
  value: '',
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default myReducer;
