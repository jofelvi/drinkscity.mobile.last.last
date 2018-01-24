import {
	Alert
} from 'react-native';

const initialState = {
	products: []
}

const productsReducer = function( state = initialState, action ){

	let newState = state;
	if( action.type == 'PRODUCTS' ){	
		newState.products = action.products.map((dato) => {
					return dato;
				});
	}
	return newState;
}


export {
	productsReducer
}