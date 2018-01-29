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
	Label,
	Thumbnail,
	Row,
	Col,
	Grid,
	CheckBox
} from 'native-base';

import {
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Alert
} from 'react-native';

import FontAwesome, {Icons} from 'react-native-fontawesome';
var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Cargar imagenes',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


export default class Perfil extends React.Component{

	static navigationOptions = {
		title: 'Perfil',
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" }
	}

	constructor(props){
		super(props);
		this.state = {
			profile_picture : null
		};
	}

	takePhoto(){
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				let source = { uri: response.uri };
				let format = {
					filename: response.fileName,
					content: response.data,
					content_type: 'image/jpeg'
				};
				let image = this.state.images;
				image[ (image.length) ] = 'data:image/jpeg;base64,' + response.data
				this.setState({
					profile_picture: image
				});
			}
			
		});
	}

	render(){
		const { width, height } = Dimensions.get('screen')
		negocio = new PerfilEmpresa({
			picture: require('../assets/img/cafe.jpeg'),
			resena: 'Sofisticado ambiente, los mejores hits.',
			telefono: '04262225797'
		});


		return(
			<Container style={styles.container}>
				<StatusBar translucent backgroundColor={'#02A6A4'} />
				<Content>
					<Form>
						<Grid style={{marginTop: 5, marginLeft: 15}}>
							<Col style={{width: "95%"}}>
								<TouchableOpacity 
									onPress={()=>{this.takePhoto()}}
									style={{
										backgroundColor: "#02A6A4",
										width: "97%",
										alignSelf: "center",
										alignContent: "center",
										marginTop: 9,										
										backgroundColor :"#02A6A4"
									}}
								>

									<FontAwesome  
										 style={{color: "#ffffff", fontSize: 52, textAlign: "center"}}
									>
										{Icons.pictureO}
									</FontAwesome>
								</TouchableOpacity>
							</Col>
						</Grid>
						<Col style={{width: "95%"}}>
							<Item floatingLabel>
								<Label style={{color: "#ffffff"}}> Reseña </Label>
								<Input
									multiline={true}
									numberOfLines={2}
									style={{color: "#ffffff"}}
								/>
							</Item>
						</Col>
						<Col style={{width: "95%"}}>
							<Item floatingLabel>
								<Label style={{color: "#ffffff"}}> Telefono </Label>
								<Input
									style={{color: "#ffffff"}}
								/>
							</Item>
						</Col>
						<Grid>
							<Col style={{width: "47.5%"}}>
								<Item floatingLabel>
									<Label style={{color: "#ffffff"}}> Dias de atencion </Label>
									<Input
										style={{color: "#ffffff"}}
									/>
								</Item>
							</Col>
							<Col style={{width: "47.5%"}}>
								<Item floatingLabel>
									<Label style={{color: "#ffffff"}}> Horario </Label>
									<Input
										style={{color: "#ffffff"}}
									/>
								</Item>
							</Col>
						</Grid>
						<Grid style={{marginTop: 5, marginLeft: 7}}>
							<Col style={{width: "10%"}}>
								<CheckBox  color={"#02A6A4"}/>
							</Col>
							<Col style={{width: "85%"}}>
								<Text style={{color: "#ffffff"}}>Tiene delivery</Text>
							</Col>
						</Grid>
						<Grid style={{marginTop: 5, marginLeft: 15}}>
							<Col style={{width: "95%"}}>
								<Button block style={{backgroundColor :"#02A6A4"}}>
									<Text style={{color:"#ffffff"}}>
										Guardar
									</Text>
								</Button>
							</Col>
						</Grid>
					</Form>
				</Content>
			</Container>
		);
	}

}

const styles = {
	container: {
		backgroundColor: "#111111",
		flex: 1,
	}
}