import Connection from '../config/connection';
import {
	Alert
} from 'react-native';

import { store } from '../redux/store';
import { searchProducts } from '../redux/actions';
const moment = require('moment');

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

	getAttribute(attr){
		return this.data[attr];
	}

	setAttribute(attr, newValue){
		this.data[attr] = newValue;
		return this.getAttribute(attr);
	}

	_validStringAttribute(attribute){
		return true;
	}

	_validIntegerAttribute(attribute){

		return !isNaN( parseFloat( this.data[attribute] ) ) && isFinite(this.data[attribute]);
	}

	_validFloatAttribute(attribute){
		return this._validIntegerAttribute(attribute);
	}

	_validDateAttribute(attribute){
		format1 = moment( this.data[attribute] , 'DD-MM-YYYY');
		format2 = moment( this.data[attribute] , 'YYYY-MM-DD');

		return (format1.isValid() || format2.isValid());
	}

	valid(type, attribute){
		return eval(`this._valid${type}Attribute('${attribute}')`);
	}

}