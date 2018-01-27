import {
	Alert
} from 'react-native';

const initialState = {
	products: [],
	funcionarios: []
}

const reducer = function( state = initialState, action ){

	let newState = state;
	if( action.type == 'PRODUCTS' ){	
		newState.products = action.products.map((dato) => {
					return dato;
				});
	}

	if( action.type == 'BUSCAR_FUNCIONARIOS' ){
		return { users: action.funcionarios };
	}
	return newState;
}


export {
	reducer
}