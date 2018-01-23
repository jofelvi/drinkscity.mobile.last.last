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

export default class PubEstandar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			titulo_aviso: '',
			categoria: 0,
			detalles: '',
			stock: 0, 
			fecha_inicio: '',
			fecha_fin: '',
			pub: new Publicacion({
				titulo_aviso: null,
				categoria: 0,
				detalles: null,
				stock: null,
				precio: 0.0
			})
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
								onChangeText={ text =>{this.state.pub.setTituloAviso(text); }}  
							/>
						</Item>
						<Picker
							mode='dropdown'
							onValueChange={value => {this.state.pub.setCategoriaId(value); this.setState({categoria: value}); }}
							style={{ color: this.props.color }}
							selectedValue={this.state.categoria}
						>
							<Item style={{color: this.props.color }} label="Tragos" value={0} />
							<Item style={{color: this.props.color }} label='Licores' value={1} /> 
						</Picker>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Detalles</Label>
							<Input onChangeText={text=>{this.state.pub.setDescripcion(text); }} multiline={true} numberOfLines={4} />
						</Item>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Stock</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ stock =>{ this.setState({ stock: this.state.pub.setStock(parseInt(stock)) }); }}  
								value={this.state.stock}
							/>
						</Item>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Precio $</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ stock =>{ this.setState({ precio: this.state.pub.setPrecio(parseFloat(stock)) }); }}  
								value={this.state.precio}
							/>
						</Item>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Fecha de inicio del anuncio</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ stock =>{ this.setState({ fecha_inicio: this.state.pub.setFechaInicio(stock) }); }}  
								value={this.state.fecha_inicio}
							/>
						</Item>
						<Item floatingLabel>
							<Label style={{ color: this.props.color }}>Fecha de finalizacion del anuncio</Label>
							<Input 
								style={{ color: this.props.color }} 
								onChangeText={ stock =>{ this.setState({ fecha_fin: this.state.pub.setFechaFin(stock) }); }}  
								value={this.state.fecha_fin}
							/>
						</Item>
					</Form>

					<Button  block style={{ backgroundColor: "#02A6A4", marginBottom: 52 }}>
						<Text style={{color: this.props.color}}>PUBLICAR</Text>
					</Button>
				
			</View>
		);
	}
}