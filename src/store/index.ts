import { createStore, combineReducers } from 'redux'
import productReducer from './reducers/product.reducer';

const allReducers = combineReducers({
  productReducer
})


const store = createStore(allReducers);

export default store
