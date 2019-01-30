export default class Connection{

	constructor(){
		this.data = {
			protocol: 'http:',
			secure_protocol: 'https:',
			host: '165.227.98.133/api/v1',
			port: 36572,

		}
	}


	getProtocol(secure = false){
		return secure ? this.data.secure_protocol : this.data.protocol;
	}

	getHost(){
		return this.data.host;
	}

	getPort(){
		return this.data.port;
	}

	setProtocol(secure = false){
		if(secure)
			this.data.secure_protocol = protocol;
		else
			this.data.protocol = protocol;

		return ( (secure) ? this.data.secure_protocol : this.data.protocol );
	}

	setHost(host){
		this.data.host = host;
		return host;
	}


	getUrlApi(destino = false){

		let url = this.getProtocol(false) + '//'+this.getHost()+'/'+((typeof destino != 'boolean') ? destino :'' );
		return url;
	}
}