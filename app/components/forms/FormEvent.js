import React from 'react';
import {
	Row,
	Grid,
	Container,
	Content,
	Col,
	Text,
	View,
	Input,
	Form,
	Item,
	Picker,
	Label,
	Button,
	Thumbnail
} from 'native-base';

import {
	Alert,
	TouchableOpacity,
	ScrollView
} from 'react-native'

import Event from '../../classes/Event';
import FontAwesome, { Icons } from 'react-native-fontawesome';

var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Cargar imagenes',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class FormEvent extends React.Component{


	static navigationOptions = {
		title: 'Crear evento',
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" }
	}


	constructor(props){
		super(props);

		const { navigation } = this.props;

		let event = (navigation.state.params.evento != false) 
					? navigation.state.params.evento
					: {
						'name' : null, 
						'category': '',
						'address': null,
						'side': null,
						'video_link': null,
						'event_day': null,
						'start_hour': null,
						'end_hour': null,
						'details': null,
						'user_id': null,
						'store_id': null,
						'priority': navigation.state.params.priority,
						'images': []
					} 

		this.state = {
			event: new Event(event),
			...event
		}
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
				let image = this.state.images;
				image[ (image.length) ] = 'data:image/jpeg;base64,' + response.data
				this.setState({
					images: image
				});
				this.state.event.setAttribute('images', this.state.images);
			}
			
		});
	}

	_renderImages(){
		const images = this.state.images.map( (data, i)=>{
			return (
				<Col>
					<View style={{flex: 1, width: 150, height: 150, marginTop: 10, marginBottom: 3}}>
						<Thumbnail 
							square  
							style={{
								width: 150,
								height: 160
							}}
							source={{uri: this.state.images[i]}} 
						/>
						<View style={{flex:1, position: 'absolute', top: 0, right: 0}}>
							<Button 
								rounded 
								danger 
								style={{elevation: 3, position: "absolute", right: 3}}
								onPress={()=>{
									let notDeletes = this.state.images.filter( (image, k) =>{
										return k != i;
									});
									this.setState({ images: notDeletes  });
									this.state.event.setAttribute('images', this.state.images);

								}}
							>
								<Text>
									<FontAwesome style={{color: "#ffffff", fontSize: 15}}>{Icons.close}</FontAwesome>
								</Text>
							</Button>
						</View>
					</View>
				</Col>
			);
		})

		return images;
	}

	render(){

		return(
			<View style={styles.container}>
				<ScrollView>
					<Form>
						<Row style={{marginLeft: 7}}>
							{this._renderImages()}
						</Row>
						<Row style={{marginLeft: 7}}>

							<Col>
								<TouchableOpacity 
									onPress={()=>{
										this.takePhoto()
									}}
									style={{
										backgroundColor: "#02A6A4",
										width: "97%",
										alingSelf: "center",
										alignContent: "center",
										marginTop: 9
									}}
								>
									<FontAwesome style={{color: "#ffffff", fontSize: 52, textAlign: "center"}}>{Icons.pictureO}</FontAwesome>
									
								</TouchableOpacity>
							</Col>
						</Row>
						<Item floatingLabel>
							<Label 
								style={{ color: "#ffffff" }} >Titulo del aviso
							</Label>
							<Input 
								style={{ color: "#ffffff" }} 
								onChangeText={ text =>{this.state.event.setAttribute('name',text); this.setState({name: text}) }} 
								value={this.state.name} 
							/>
						</Item>
						<Picker
							mode='dropdown'
							onValueChange={value => { this.state.event.setAttribute('category', value); this.setState({category: value}); }}
							style={{ color: "#ffffff" }}
							selectedValue={this.state.category}
						>
							<Item style={{color: "#ffffff" }} label="Categoria" value={''} />
							<Item style={{color: "#ffffff" }} label="Tragos" value={0} />
							<Item style={{color: "#ffffff" }} label='Licores' value={1} /> 
						</Picker>
						<Item floatingLabel>
							<Label style={{ color: "#ffffff" }}>Direccion</Label>
							<Input  style={{ color: "#ffffff" }} value={this.state.address} onChangeText={address=>{ this.setState({address: this.state.event.setAttribute('address', address)}); }} multiline={true} numberOfLines={4} />
						</Item>
						<Item floatingLabel>
							<Label style={{ color: "#ffffff" }}>Detalles</Label>
							<Input  style={{ color: "#ffffff" }} value={this.state.details} onChangeText={text=>{ this.setState({details: this.state.event.setAttribute('details', text)}); }} multiline={true} numberOfLines={4} />
						</Item>
						<Item floatingLabel>
							<Label style={{ color: "#ffffff" }}>Video promocional (Link)</Label>
							<Input 
								style={{ color: "#ffffff" }} 
								onChangeText={ video_link =>{ this.setState({ video_link: this.state.event.setAttribute('video_link', video_link) }) }}  
								value={this.state.video_link}
							/>
						</Item>
						<Item floatingLabel>
							<Label style={{ color: "#ffffff" }}>Fecha del evento</Label>
							<Input 
								style={{ color: "#ffffff" }} 
								onChangeText={ event_day =>{ this.setState({ event_day: this.state.event.setAttribute('event_day', event_day) }) }}  
								value={this.state.event_day}
							/>
						</Item>
						<Row>
							<Col style={{ width: "50%" }}>
								<Item floatingLabel>
									<Label style={{ color: "#ffffff" }}>Hora de inicio</Label>
									<Input 
										style={{ color: "#ffffff" }} 
										onChangeText={ start_hour =>{ this.setState({ start_hour: this.state.event.setAttribute('start_hour', start_hour) }) }}  
										value={this.state.start_hour}
									/>
								</Item>
							</Col>
							<Col style={{ width: "50%" }}>
								<Item floatingLabel>
									<Label style={{ color: "#ffffff" }}>Hora de inicio</Label>
									<Input 
										style={{ color: "#ffffff" }} 
										onChangeText={ end_hour =>{ this.setState({ end_hour: this.state.event.setAttribute('end_hour', end_hour) }) }}  
										value={this.state.end_hour}
									/>
								</Item>
							</Col>
						</Row>
					</Form>

					<Button onPress={()=>{ this.state.event.push(this.props.navigation) }}  block style={{ backgroundColor: "#02A6A4", marginBottom: 52 }}>
						<Text style={{color: "#ffffff"}}>PUBLICAR</Text>
					</Button>
				</ScrollView>
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