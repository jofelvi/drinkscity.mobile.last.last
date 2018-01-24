import { createStore } from 'redux'
import { productsReducer } from './reducers';

let store = createStore(productsReducer);

export {
	store
};