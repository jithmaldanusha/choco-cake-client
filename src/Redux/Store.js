// store.js
import { createStore, combineReducers  } from 'redux';
import myReducer from './Reducer';
import product from './ItemDetailsReducer'
import myReducerQty from './QtyReducers'
import myReducerCart from './CartReducer';

// Combine reducers
const rootReducer = combineReducers({
    myReducer: myReducer,
    product: product,
    myReducerQty:myReducerQty,
    myReducerCart:myReducerCart
  });

const store = createStore(rootReducer);

export default store;
