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

export default class PubEstandar extends React.Component{
	constructor(props){
		super(props);

		var producto = (this.props.producto) 
						? this.props.producto 
						: { stock: 0, name: '', category: 0, description: '', price: 0.00, fecha_inicio: '1900-01-01', fecha_fin: '1900-01-01' };
		this.state = {
			pub: new Product(producto),
			...this.props.producto
		};

	}

	render(){
		return(
			<View>
					<Form>
					<Row style={{marginLeft: 7}}>

						<Col>
							<TouchableOpacity style={{
								backgroundColor: "#02A6A4",
								width: 170,
								alingSelf: "center",
								alignContent: "center",
								marginTop: 9
							}}>
								<FontAwesome style={{color: "#ffffff", fontSize: 52, textAlign: "center"}}>{Icons.pictureO}</FontAwesome>
								
							</TouchableOpacity>
						</Col>
						<Col>
							<TouchableOpacity style={{
								backgroundColor: "#02A6A4",
								width: 170,
								alingSelf: "center",
								alignContent: "center",
								marginTop: 9
							}}>
								<FontAwesome style={{color: "#ffffff", fontSize: 52, textAlign: "center"}}>{Icons.camera}</FontAwesome>
								
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

					<Button onPress={()=>{ this.state.pub.push() }}  block style={{ backgroundColor: "#02A6A4", marginBottom: 52 }}>
						<Text style={{color: this.props.color}}>PUBLICAR</Text>
					</Button>
				
			</View>
		);
	}
}