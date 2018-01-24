import React from 'react';

import { 
	Container,
	Content,
	Grid,
	Row,
	Col,
	Text,
	Card,
	CardItem,
	Body,
	View,
	Thumbnail,
	H2,
	Spinner,
	H3,
	Left,
	Button,
	Right
} from 'native-base';
import { 
	Alert,
	Dimensions,
	StatusBar,
	Image,
	TouchableOpacity
} from 'react-native';

import Product from '../classes/Product'
import { store } from '../redux/store';
import FontAwesome, { Icons } from 'react-native-fontawesome';
const moment = require('moment')

export default class Productos extends React.Component{

	static navigationOptions = {
		title: 'Mis productos',
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" }
	}

	constructor(props){
		super(props);
		this.state = {
			products: []
		};

		store.subscribe(()=>{
			this.setState({
				...store.getState()
			});
		});
	}

	componentWillMount(){
		let instance = new Product;
		instance.allToRedux();
	}

	_renderCol(dato){
		let day = moment(dato.created_at).format('DD-MM-YYYY');
		return(
			<Col style={{width: "100%"}}>
				<Card>
					<CardItem>
						<Body>
							<H3 style={{fontWeight: 'bold'}}>
								{ dato.name }
							</H3>
							<Text note>
								{' \n'}
								<FontAwesome>{Icons.calendar}</FontAwesome> {day}
							</Text>
						</Body>
						<Right>
							<Button transparent>
								<Text>
									<FontAwesome style={{color: "#02A6A4", fontSize: 20}}>{Icons.pencil}</FontAwesome>
								</Text>
							</Button>
						</Right>
					</CardItem>
					<CardItem cardBody>
							<Image
								source={{uri: 'https://victormartinez.me/wp-content/uploads/2017/08/react-native-portada.jpg'}}
								style={{ height: 200, width: "100%", flex: 1 }}
								/>

							<View
								style={{
									position: "absolute",
									top: 130,
									bottom: 0,
									backgroundColor: "#10181B",
									width: 220,
									paddingLeft: 9,
									paddingTop: 3
								}}
							>
							<Text style={{color: "#ffffff", fontWeight: 'bold', marginLeft: 3}} >
								{dato.description}
							</Text>
							</View>
					</CardItem>
					<CardItem>
						<Left>
							<Button transparent>
								<Text style={{fontWeight: 'bold', fontSize: 15, color: "#02A6A4"}}>
									$ {dato.price}
								</Text>
							</Button>
						</Left>
						<Body>
							<Button transparent>
								<Text>
									<FontAwesome style={{fontSize: 20, color: "#02A6A4"}}>{Icons.bookmark}</FontAwesome>
									<Text style={{fontWeight: 'bold', fontSize: 15, color: "#02A6A4"}}>{' '+dato.category}</Text>
								</Text>
							</Button>
						</Body>
					</CardItem>
				</Card>
			</Col>
		);
	}

	_renderCards(){
		let { products } = this.state;
		if( products.length >0){
			const cards = products.map( ( dato, i ) =>{

				return <Row>{this._renderCol(dato)}</Row>
			});
			return cards;
		}
		else{
			const cards2 = <Spinner color={'#02A6A4'} />
			return cards2;
		}

		
	}

	render(){
		const { width, height } = Dimensions.get('screen')
		
		return(
			<View style={styles.container}>
				<Content>
					{this._renderCards()}
				</Content>
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