import React from 'react';
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
	Body,
	Picker
} from 'native-base';

import {
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Alert
} from 'react-native';

import FontAwesome, {Icons} from 'react-native-fontawesome';
import Funcionario from '../classes/Funcionario';

export default class AboutFuncionario extends React.Component{

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.titulo}`,
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" },
		headerLeft: null,
		headerRight: <Button onPress={()=>{navigation.goBack()}} transparent><Text><FontAwesome style={{color:"#ffffff", fontSize: 22}}>{Icons.close}</FontAwesome></Text></Button> 
	
	});

	constructor(props){
		super(props);

		const { navigation } = this.props;
		const { state } = navigation;
		let func = ( state.params.funcionario != false ) 
			? state.params.funcionario 
			: {full_name: '', email: '', password: '', phone: '', type: 0};

		this.state = {
			funcionario: new Funcionario(func),
			...func
		}
	}

	render(){
		const { width, height } = Dimensions.get('screen')
		const { state } = this.props.navigation;
		return(
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#02A6A4'} />
				<Container>
					<Form>
						<Item floatingLabel>
							<Label 
								style={{ color:  "#ffffff"}} >Nombre completo
							</Label>
							<Input 
								value={this.state.full_name}
								onChangeText={ text => { this.setState({ full_name: this.state.funcionario.setAttribute('full_name', text) }); } }
								style={{ color:  "#ffffff"}} 
							/>
						</Item>
						<Item floatingLabel>
							<Label 
								style={{ color:  "#ffffff"}} >Correo Electronico
							</Label>
							<Input 
								value={this.state.full_name}
								onChangeText={ text => { this.setState({ email: this.state.funcionario.setAttribute('email', text) }); } }
								style={{ color:  "#ffffff"}} 
							/>
						</Item>
						<Item floatingLabel>
							<Label 
								style={{ color:  "#ffffff"}} >Asignar una clave
							</Label>
							<Input 
								secureTextEntry={true}
								value={this.state.password}
								onChangeText={ text => { this.setState({ password: this.state.funcionario.setAttribute('password', text) }); } }
								style={{ color:  "#ffffff"}} 
							/>
						</Item>
						<Item floatingLabel>
							<Label 
								style={{ color:  "#ffffff"}} >Telefono
							</Label>
							<Input 
								value={this.state.password}
								onChangeText={ text => { this.setState({ phone: this.state.funcionario.setAttribute('phone', text) }); } }
								style={{ color:  "#ffffff"}} 
							/>
						</Item>
						<Picker
							mode='dropdown'
							onValueChange={(value)=>{ this.setState({ type: this.state.funcionario.setAttribute('type',value ) }); }}
							style={{ color:  "#ffffff"}}
							selectedValue={this.state.type}
						>
							<Item style={{color:  "#ffffff"}} label="RRPP" value={0} />
							<Item style={{color:  "#ffffff"}} label='Validador' value={1} /> 
						</Picker>
					</Form>

					<Button onPress={()=>{ this.state.funcionario.push() }}  block style={{ backgroundColor: "#02A6A4", marginBottom: 52 }}>
						<Text style={{color:"#ffffff"}}>CREAR</Text>
					</Button>
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