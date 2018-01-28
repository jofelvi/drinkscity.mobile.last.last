/**
 * MODELO DE PRODUCTO
 * @author: GIOVANNY AVILA <gjavila1995@gmail.com>
 * @description : CLASE DESARROLLADA PARA MODELAR LA TABLA DE PRODUCTOS QUE ESTA 
 *              EN EL SERVIDOR Y MINIMIZAR LOS CAMBIOS NECESARIOS CUANDO LA API SEA COMPLETADA
 *
 * 
 */

import Connection from '../config/connection';
import Model from './Model';

import {
	Alert
} from 'react-native'

String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase()+this.slice(1);
};

export default class Event extends Model{

	constructor( data = false){
		super('events', data);

		/**
		 * MODELO DE LA TABLA DE PRODUCTOS ALOJADA EN EL SERVIDOR
		 * @type {Array}
		 */
		this.fillable = [
			'name', 
			'category',
			'address',
			'side',
			'video_link',
			'event_day',
			'start_hour',
			'end_hour',
			'details',
			'user_id',
			'store_id',
			'priority'
		];

		/**
		 * CONFIGURACION DE CADA UNO DE LOS CAMPOS DE LA TABLA DE PRODUCTOS
		 * ALOJADA EN EL SERVIDOR; MANTIENE UN OBJETO COMPUESTO DE OBJETOS CUYOS INDICES
		 * DEL OBJETO ES CADA UNO DE LOS STRINGS DEL ARREGLO DE LOS CAMPOS DEL ARREGLO FILLABLE
		 * CON EL TIPO (PARA SER VALIDADO) Y EL HECHO DE QUE SEA REQUERIDO O NO
		 * @type {Object}
		 */
		this.data_type = {
			name : { type: 'string', required: true, alias: "Titulo del evento" }, 
			category : {type: 'integer', required: false, alias: 'Categoria'},
			address: {type: 'string', required: true, alias: 'Direccion del evento'},
			side : {type: 'string', required: false, alias: 'Lugar del evento'},
			video_link : {type: 'string', required: false, alias: 'Video de presentacion'},
			event_day : {type: 'date', required: true, alias:'Fecha del evento'},
			start_hour : {type: 'time', required: true, alias: 'Hora de inicio del evento (con formato HH:MM:SS AM/PM)'},
			end_hour: {type:'time', required: true, alias: 'Hora de finalizacion del evento'},
			user_id: {type:'integer', required: true, alias: 'Usuario'},
			store_id:  {type:'integer', required: true, alias: 'Tienda'},
			details: {type: 'string', required: true, alias: 'Los detalles del evento no pueden quedar en blanco'}
		}
	}

	/**
	 * METODO PARA VALIDAR Y ENVIAR LOS DATOS AL SERVIDOR
	 * @return boolean RETORNA FALSO SI HA OCURRIDO ALGUN ERROR
	 */
	push(navigation = null){

		// SE CALCULA LA LONGITUD DEL ARREGLO DE CAMPOS DE LA TABLA Y SE 
		// RECORRE EN UN FOR PARA VALIDARLOS
		let data = this.fillable.length;
		for (var i = 0; i < data; i++) {

			//	USANDO LA POSICION DEL STRING DE CADA UNO DE LOS CAMPOS DE LA TABLA
			//	ALMACENADOS EN EL ARRAY FILLABLE Y SE USA PARA VALIDAR EL CAMPO
			//	EN EL OBJETO DATA
			if((this.data[ this.fillable[i] ] == '' && this.fillable[i] != 'priority') && this.data_type[ this.fillable[i] ].required ){
				Alert.alert('Error', '[ '+this.fillable[i]+'] Debe completar todos los campos presentes en el formulario ->'+JSON.stringify(this.data));
				return false;
			}else{
				let type = this.data_type[ this.fillable[i] ].type
				if( !this.valid( type.capitalize(), this.fillable[i] ) ){
					Alert.alert('Error', 'Error de tipo para el dato '+this.data_type[ this.fillable[i] ].alias );
					return false;
				}
			}
		}
		let resp = super.push('product', 'POST', navigation);
	}
}