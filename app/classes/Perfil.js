export default class PerfilEmpresa{

	data = null;

	constructor(profile){
		this.data = {
			...profile
		}
	}

	getPerfilPicture(){
		if(this.data != null){
			return this.data.foto_perfil;
		}
	}

	getResena(){
		if(this.data != null)
			return this.data.resena;
	}

	getTelefono(){
		if(this.data != null)
			return this.data.telefono;
	}

}