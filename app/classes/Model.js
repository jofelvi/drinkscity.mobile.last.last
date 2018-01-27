import Connection from '../config/connection';
import {
	Alert
} from 'react-native';

import { store } from '../redux/store';
import { searchProducts, modelActions } from '../redux/actions';
import { funcionarios } from '../redux/actions';

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

	async push(param, method = 'GET' ,exito ='Los datos han sido guardados correctamente', error = 'Ha ocurrido un error al intentar guardar los datos'){
		let connection = new Connection;

		let json = JSON.stringify(this.data)
		const body = '{"'+param+'":'+json+'}'
		return await fetch( connection.getUrlApi(this._model), {
			method,
			headers:{
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: body
		}).then( resp => resp);
	}

	async getAll(){
		const con = new Connection();
		let url = con.getUrlApi(this._model);

		let req = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		}).then( resp =>{
			return resp._bodyInit;
		});

		store.dispatch(modelActions(req, this._model));
	}	

	async delete(method = 'DELETE'){
		const con = new Connection();
		
		var req = await fetch(con.getUrlApi(this._model)+'/'+this.data.id, {
			method,
			headers:{
				Accept: 'application/json'
			}
		}).then( resp =>{ Alert.alert('Accion realizada', 'La accion se ha realizado de manera correcta'); } );

	}

	async update(method = 'PUT', navigation){
		const con = new Connection();

		let params = '{ "user" : '+JSON.stringify(this.data)+' }';

		let req = await fetch(con.getUrlApi(this._model)+'/'+this.data.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: params
		}).then(resp => {
			const { _bodyInit } = resp;
			if(resp.status == '200' || resp.status == 200){
				Alert.alert('Correcto', 'Los datos han sido actualizados correctamente', [
					{
						text: 'Aceptar',
						onPress:()=>{ 
							navigation.navigate('BtnFuncionarios', {titulo: 'Funcionarios', funcionario: false});
							navigation.state.params.onUpdate(resp._bodyInit);
						}
					}
				]);
			}
			else{
				Alert.alert('Error', 'A ocurrido un error inesperado -> '+JSON.stringify(resp)+' -> '+params);
			}
		});
	}
}
