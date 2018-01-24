import Connection from '../config/connection';
import Model from './Model';

export default class Product extends Model{

	constructor( data = false){
		super('products', data);
	}

}