import Connection from '../config/connection';
import {
	Alert
} from 'react-native';

import { store } from '../redux/store';
import { searchProducts } from '../redux/actions';

export default class Model{


	constructor( model, data = false){

		this._model = model;

		if( typeof data != 'boolean')
			this.data = {
				...data
			};

		else
			this.data = false;

		this.newCollection = [];

		store.subscribe(()=>{
			this.newCollection = store.getState()
		})
	}

	_createCollection( collection ){

		for(object in collection){
			this.newCollection.push( (new Model( this._model, collection[parseInt(object)]) ) );
		}
		return this.newCollection;

	}

	async _getRequest(){
		let connection = new Connection;
		let data = await fetch( connection.getUrlApi(this._model), {
			method: 'GET',
			headers:{
				Accept: 'application/json'
			}
		} ).then( data =>{ return JSON.parse(data._bodyInit);} ).then( data => data	 );

		store.dispatch(searchProducts(data));
	}

	allToRedux(){
		this._getRequest();
	}

}