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
	Spinner
} from 'native-base';
import { 
	Alert,
	Dimensions,
	StatusBar,
	Image
} from 'react-native';

import Product from '../classes/Product'
import { store } from '../redux/store';
import FontAwesome, { Icons } from 'react-native-fontawesome';

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
		return(
			<Col style={{width: "100%"}}>
				<Card>
					<CardItem cardBody>
						<Image
							source={{uri: 'https://victormartinez.me/wp-content/uploads/2017/08/react-native-portada.jpg'}}
							style={{ height: 200, width: "100%", flex: 1 }}
					/>
					</CardItem>
					<CardItem>
						<H2 style={{fontWeight: 'bold'}}>
							{ dato.name }
						</H2>
					</CardItem>
					<CardItem>
						<Text>
							<FontAwesome>{Icons.dollar}</FontAwesome> 
							{dato.price}
							{'\n'}
							<FontAwesome>{Icons.calendar}</FontAwesome> {'fecha'}
						</Text>
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