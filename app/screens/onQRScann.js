import React from 'react';
import {
	View,
	Container,
	Content,
	Grid,
	Row,
	Col,
	H2,
	Spinner
} from 'native-base';

import {
	StatusBar,
	Dimensions,
	Image,
	TouchableOpacity,
	Alert
} from 'react-native';

import {
	Thumbnail,
	Button,
	Text
} from 'native-base'

import Connection from '../config/connection';
import Model from '../classes/Model'
export default class onQRScann extends React.Component{

	static navigationOptions = {
		title: 'Verificacion de orden',
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" }
	}


	constructor(props){
		super(props);
		this.state = {
			user: null,
			order: null
		}
	}

	async componentWillMount(){
		let user = {};
		let order = {};
		user = await Model.getWithId('users', 1).then( resp => JSON.parse(resp) );
		const { navigation } = this.props;
		const { scanData } = navigation.state.params

		order = await Model.getWithId('orders', scanData.data).then( resp => JSON.parse(resp) );
		this.setState({
			order: order,
			user: user
		});
	}

	_resumenOrder(){
		if(this.state.order != null && this.state.user!=null){
			return (
				<View>
					<View style={{alignSelf: "center"}}>
						<H2 style={{color: "#ffffff", fontSize: 18}}>ORDEN A FAVOR DE {this.state.user.fullname}</H2>
					</View>
					<View style={{alignSelf: "center"}}>
						<H2 style={{color: "#ffffff", fontSize: 14, fontWeight: 'bold'}}>SUB TOTAL: .... {this.state.order.subtotal}</H2>
					</View>
				</View>
			);
		}

		return (
			<View style={{alignSelf: "center"}}>
				<Spinner color={"#02A6A4"} />
				<H2
					style={{color:"#ffffff", fontSize: 13}}>
					Buscando ...
				</H2>
			</View>
		);
	}

	async _validate(order){
		let session = await AsyncStorage.getItem("@session");
		let token = await JSON.parse(session);
		const body = '{"id": '+order.order_items[0].order_id+' }';
		con = new Connection();
		let resp = await fetch( con.getUrlApi('orders/validate_order'), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token.token
			},
			body: body
		}).then( resp =>{
			if(resp.status == 200 || resp.status == '200'){
				Alert.alert('Correcto', 'La orden ha sido correctamente validada', [
					{
						text: "Aceptar",
						onPress:()=>{ this.props.navigation.goBack() }	
					}
				]);
			}

		});
	}

	validateOrder(){
		let { order } = this.state;
		if( order.order_status_id != 3 || order.order_status_id != '3' ){
			Alert.alert('Error', 'Las unicas ordenes a validar son aquellas que se encuentran aprobadas');
			return false;
		}

		
		Alert.alert('Advertencia', '¿Seguro que desea realizar esta accion?', [
			{
				text: 'Aceptar',
				onPress:()=>{
					this._validate(order);
				}
			},
			{
				text: "Cancelar"
			}
		]);
		
	}


	render(){
		const { width, height } = Dimensions.get('screen')
		return(
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#02A6A4'} />
				<View>
					<View>
						<TouchableOpacity style={{marginTop: 17,xalignSelf: "center", alignContent: "center",alignItems: "center"}}>
							<Image
								source={require('../assets/img/drinkscity_logo.png')}
								style={{
									width: 95,
									height: 100
								}}
							/>
						</TouchableOpacity>
					</View>
					<View style={{marginTop: "14%"}}>
						<Button onPress={()=>{this.validateOrder()}}  rounded full danger>
							<Text style={{color: "#ffffff"}}>Validar</Text>
						</Button>
					</View>
					<View>
						{this._resumenOrder()}
					</View>
				</View>
			</View>
		);
	}

}

const styles = {
	container: {
		backgroundColor: "#111111",
		flex: 1,
	}
}