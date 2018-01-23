import React from 'react';
import PerfilEmpresa from '../classes/Perfil';

import {
	View,
	Container,
	Content,
	Button,
	Text,
	Form,
	Item,
	Input,
	Label
} from 'native-base';

import {
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Alert
} from 'react-native';


export default class Perfil extends React.Component{

	static navigationOptions = {
		title: 'Perfil',
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" }
	}

	constructor(props){
		super(props);
	}

	render(){
		const { width, height } = Dimensions.get('screen')
		negocio = new PerfilEmpresa({
			picture: require('../assets/img/cafe.jpeg'),
			resena: 'Sofisticado ambiente, los mejores hits.',
			telefono: '04262225797'
		});


		return(
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'transparent'} />
				<Container>
					<Content>
						<Text style={{color: "#ffffff"}}>{negocio.getResena()}</Text>
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