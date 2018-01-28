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
	Picker,
	Grid,
	Row,
	Col,
	Thumbnail
} from 'native-base';

import {
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Alert,
	Image,
	ScrollView
} from 'react-native';
import Publicacion from '../../classes/Publicacion';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Product from '../../classes/Product'
var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Cargar imagenes',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class PubEstandar extends React.Component{
	constructor(props){
		super(props);

		var producto = (this.props.producto) 
						? this.props.producto 
						: {images:[], user_id: 2, store_id: 2, priority: this.props.priority, stock: 0, name: '', category: 0, description: '', price: 0.00, fecha_inicio: '1900-01-01', fecha_fin: '1900-01-01' };
		
		this.state = {
			pub: new Product(producto),
			images: [],
			...this.props.producto
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
				let image = this.state.images;
				image[ (image.length) ] = 'data:image/jpeg;base64,' + response.data
				this.setState({
					images: image
				});
				this.state.pub.setAttribute('images', this.state.images);
			}
			
		});
	}

	_renderButton(){
		return (
			<Col>
				<TouchableOpacity 
								
					style={{
						backgroundColor: "#02A6A4",
						width: 170,
						alingSelf: "center",
						alignContent: "center",
						marginTop: 9
						}}
				>
					<FontAwesome style={{color: "#ffffff", fontSize: 52, textAlign: "center"}}>{Icons.camera}</FontAwesome>
								
				</TouchableOpacity>
			</Col>
		)
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
									this.state.pub.setAttribute('images', this.state.images);

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
			<View>
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
								style={{ color: this.props.color }} >Titulo del aviso
							</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ text =>{this.state.pub.setAttribute('name',text); this.setState({name: text}) }} 
								value={this.state.name} 
							/>
						</Item>
						<Picker
							mode='dropdown'
							onValueChange={value => { this.state.pub.setAttribute('category', value); this.setState({category: value}); }}
							style={{ color: this.props.color }}
							selectedValue={this.state.category}
						>
							<Item style={{color: this.props.color }} label="Tragos" value={0} />
							<Item style={{color: this.props.color }} label='Licores' value={1} /> 
						</Picker>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Detalles</Label>
							<Input  style={{ color: this.props.color }} value={this.state.description} onChangeText={text=>{ this.setState({description: this.state.pub.setAttribute('description', text)}); }} multiline={true} numberOfLines={4} />
						</Item>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Stock</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ stock =>{ this.setState({ stock: this.state.pub.setAttribute('stock', stock) }) }}  
								value={this.state.stock}
							/>
						</Item>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Precio $</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ price =>{ this.setState({ price: this.state.pub.setAttribute('price', price) }) }}  
								value={this.state.price}
							/>
						</Item>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Fecha de inicio del anuncio</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ fecha_inicio =>{ this.setState({ fecha_inicio: this.state.pub.setAttribute('fecha_inicio', fecha_inicio) }) }}  
								value={this.state.fecha_inicio}
							/>
						</Item>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Fecha de finalizacion del anuncio</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ fecha_fin =>{ this.setState({ fecha_fin: this.state.pub.setAttribute('fecha_fin', fecha_fin) }); }}  
								value={this.state.fecha_fin}
							/>
						</Item>
					</Form>

					<Button onPress={()=>{ this.state.pub.push(this.props.navigation) }}  block style={{ backgroundColor: "#02A6A4", marginBottom: 52 }}>
						<Text style={{color: this.props.color}}>PUBLICAR</Text>
					</Button>
				
			</View>
		);
	}
}