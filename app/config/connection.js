export default class Connection{

	constructor(){
		this.data = {
			protocol: 'http:',
			secure_protocol: 'https:',
			host: 'dylanowen.herokuapp.com/api/v1',
			port: 80,

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

	setProtocol(protocol, secure = false){
		if(secure)
			this.data.secure_protocol = protocol;
		else
			this.data.protocol = protocol;

		return protocol;
	}

	setHost(host){
		this.data.host = host;
		return host;
	}


	getUrlApi(destino = false){

		let url = this.getProtocol(true) + '//'+this.getHost()+'/'+((typeof destino != 'boolean') ? destino :'' );
		return url;
	}
}