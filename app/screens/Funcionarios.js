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

import FontAwesome, {Icons} from 'react-native-fontawesome';

export default class Funcionarios extends React.Component{

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.titulo}`,
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" },
		headerRight: <Button onPress={()=>{navigation.navigate('FormFuncionario', {titulo: 'Crear Funcionario', side: 'screen', funcionario: false})}} transparent><Text><FontAwesome style={{color:"#ffffff", fontSize: 22}}>{Icons.plus}</FontAwesome></Text></Button> 
	});

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
									<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Estandar', {tipo: "ESTANDAR", titulo: "PUBLICACION ESTANDAR", dato: false})}}>
										<Text style={{color: "#ffffff"}}>RRPP</Text>
									</TouchableOpacity>
								</Body>
							</ListItem>
							<TouchableOpacity>
								<ListItem>
									<Text style={{color: "#ffffff"}}>Validadores</Text>
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