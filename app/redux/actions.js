import {
	Alert
} from 'react-native';

const searchProducts = function(products = []){

	return {
		type: 'PRODUCTS',
		products
	};
}

export {
	searchProducts
}