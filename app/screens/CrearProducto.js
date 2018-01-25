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
				<StatusBar translucent backgroundColor={'transparent'} />
				<Container>
					<Content>
						<List>
							<ListItem>
								<Body>
									<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Estandar', {tipo: "ESTANDAR", titulo: "PUBLICACION ESTANDAR", dato: false})}}>
										<Text style={{color: "#ffffff"}}>PUBLICACION ESTANDAR</Text>
									</TouchableOpacity>
								</Body>
							</ListItem>
							<TouchableOpacity>
								<ListItem>
									<Text style={{color: "#ffffff"}}>OFERTA DEL MOMENTO</Text>
								</ListItem>
							</TouchableOpacity>
							<TouchableOpacity>
								<ListItem>
									<Text style={{color: "#ffffff"}}>PROMOCION</Text>
								</ListItem>
							</TouchableOpacity>
							<TouchableOpacity>
								<ListItem>
									<Text style={{color: "#ffffff"}}>PUBLICIDAD DESTACADA</Text>
								</ListItem>
							</TouchableOpacity>
							<TouchableOpacity>
								<ListItem>
									<Text style={{color: "#ffffff"}}>PUBLICACION VIP (Slide Principal)</Text>
								</ListItem>
							</TouchableOpacity>
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