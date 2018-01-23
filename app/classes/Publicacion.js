import {
	Alert
} from 'react-native'

export default class Publicacion{

	constructor(datos = false){
		if(datos !== false)
			this.datos = {
				...datos
			}
	}

	getTituloAviso(){
		return this.datos.titulo_aviso;
	}

	setTituloAviso( newTitle ){
		this.datos.titulo_aviso = newTitle;
	}

	setCategoriaId(id){
		this.datos.categoria = id;
		return id;
	}

	getCategoriaId(){
		return this.datos.categoria;
	}

	setDescripcion(text){
		this.datos.descripcion = text;
	}

	setStock(stock){
		this.datos.stock = stock;
		return stock;
	}


	setPrecio(precio){
		this.datos.precio = precio;
	}

	setFechaInicio(fecha){
		this.datos.fecha_inicio = fecha;
		return fecha;
	}
	
	setFechaFin(fecha){
		this.datos.fecha_fin = fecha;
		return fecha;
	}
}