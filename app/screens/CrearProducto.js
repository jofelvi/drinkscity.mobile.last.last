import React from 'react';
import {Perfil as PerfilEmpresa} from '../classes/Perfil';

import {
	View,
	Container,
	Content,
	Button,
	Text,
	Form,
	Item,
	Input,
	Label,
	List,
	ListItem,
	Icon,
	Right,
	Left,
	Body
} from 'native-base';

import {
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Alert
} from 'react-native';


export default class CrearProducto extends React.Component{

	static navigationOptions = {
		title: 'Crear Producto',
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" }
	}

	constructor(props){
		super(props);
	}

	render(){
		const { width, height } = Dimensions.get('screen')


		return(
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#02A6A4'} />
				<Container>
					<Content>
						<List>
							<ListItem>
								<Body>
									<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Estandar', {tipo: "ESTANDAR", titulo: "PUBLICACION ESTANDAR", dato: false, priority: 0})}}>
										<Text style={{color: "#ffffff"}}>PUBLICACION ESTANDAR</Text>
									</TouchableOpacity>
								</Body>
							</ListItem>
							<ListItem>
								<Body>
									<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Estandar', {tipo: "ESTANDAR", titulo: "PUBLICACION ESTANDAR", dato: false, priority: 1})}}>
										<Text style={{color: "#ffffff"}}>OFERTA DEL MOMENTO</Text>
									</TouchableOpacity>
								</Body>
							</ListItem>
							<ListItem>
								<Body>
									<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Estandar', {tipo: "ESTANDAR", titulo: "PUBLICACION ESTANDAR", dato: false, priority: 2})}}>
										<Text style={{color: "#ffffff"}}>PROMOCION</Text>
									</TouchableOpacity>
								</Body>
							</ListItem>
							<ListItem>
								<Body>
									<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Estandar', {tipo: "ESTANDAR", titulo: "PUBLICACION ESTANDAR", dato: false, priority: 3})}}>
										<Text style={{color: "#ffffff"}}>PUBLICACION DESTACADA</Text>
									</TouchableOpacity>
								</Body>
							</ListItem>
							<ListItem>
								<Body>
									<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Estandar', {tipo: "ESTANDAR", titulo: "PUBLICACION ESTANDAR", dato: false, priority: 4})}}>
										<Text style={{color: "#ffffff"}}>PUBLICACION VIP (Slide Principal)</Text>
									</TouchableOpacity>
								</Body>
							</ListItem>
						</List>
					</Content>
				</Container>
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