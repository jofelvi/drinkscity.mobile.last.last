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
	ScrollView,
	WebView
} from 'react-native'

import Event from '../../classes/Event';
import FontAwesome, { Icons } from 'react-native-fontawesome';
const moment = require('moment');

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
					: new Event({
						'name' : '', 
						'category' :'',
						'address': '',
						'video_link': '',
						'start_datetime': new Date(),
						'end_datetime': new Date(),
						'description': '',
						'user_id': 1,
						'store_id': 2,
						'priority': '',
						'active': '',
						'longitude': '-',
						'latitude': '-',
						'priority': navigation.state.params.priority
					});

		this.state = {
			...event.data,
			event: event,
			meth: (navigation.state.params.evento != false)  ? 'PUT' : 'POST'
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

	_showVideoByLink(link = null){
		let video = new String(link);
		let id =  video.split('watch?v=');
		return 'https://youtube.com/embed/'+id[1];
	}

	render(){

		return(
			<View style={styles.container}>
				<ScrollView>
					<Form>
						<Row>

							<Col>
								<WebView
									source={{ uri : this._showVideoByLink(this.state.video_link) }}
									style={{ height: 300, width: "100%" }}
								/>
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
							<Item style={{color: "#ffffff" }} label="Electronica" value={"electronica"} />
							<Item style={{color: "#ffffff" }} label='Evento cultural' value={'evento_cultural'} />
							<Item style={{color: "#ffffff" }} label='Otros' value={'otros'} /> 
						</Picker>
						<Item floatingLabel>
							<Label style={{ color: "#ffffff" }}>Direccion</Label>
							<Input  style={{ color: "#ffffff" }} value={this.state.address} onChangeText={address=>{ this.setState({address: this.state.event.setAttribute('address', address)}); }} multiline={true} numberOfLines={4} />
						</Item>
						<Item floatingLabel>
							<Label style={{ color: "#ffffff" }}>Detalles</Label>
							<Input  style={{ color: "#ffffff" }} value={this.state.description} onChangeText={text=>{ this.setState({description: this.state.event.setAttribute('description', text)}); }} multiline={true} numberOfLines={4} />
						</Item>
						<Item floatingLabel>
							<Label style={{ color: "#ffffff" }}>Video promocional (Link)</Label>
							<Input 
								style={{ color: "#ffffff" }} 
								onChangeText={ video_link =>{ this.setState({ video_link: this.state.event.setAttribute('video_link', video_link) }) }}  
								value={this.state.video_link}
							/>
						</Item>
						<Row>
							<Col style={{ width: "100%" }}>
								<Item floatingLabel>
									<Label style={{ color: "#ffffff" }}>Fecha y hora del evento</Label>
									<Input 
										style={{ color: "#ffffff" }} 
										onChangeText={ event_day =>{ this.setState({ start_datetime: this.state.event.setAttribute('start_datetime', event_day) }) }}  
										value={ moment(this.state.start_datetime ).format('YYYY-DD-MM hh:mm A') }
									/>
								</Item>
							</Col>
						</Row>
						<Row>
							<Col style={{ width: "100%" }}>
								<Item floatingLabel>
									<Label style={{ color: "#ffffff" }}>Fecha y hora de finalizacion</Label>
									<Input 
										style={{ color: "#ffffff" }} 
										onChangeText={ end_datetime =>{ this.setState({ end_datetime: this.state.event.setAttribute('end_datetime', end_datetime) }) }}  
										value={ moment(this.state.end_datetime ).format('YYYY-DD-MM hh:mm A')}
									/>
								</Item>
							</Col>
						</Row>
					</Form>

					<Button onPress={()=>{ 
						if(this.state.meth == 'PUT')
							this.state.event.update('PATCH','event', this.state.id ,this.props.navigation)
						else
							this.state.event.push(this.props.navigation, this.state.meth) 
					}}  block style={{ backgroundColor: "#02A6A4", marginBottom: 52 }}>
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