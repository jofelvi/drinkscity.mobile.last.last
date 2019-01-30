import React from 'react';
import {
	Container,
	Content,
	View,
	Text,
	Body,
	List,
	ListItem,
	Label,
	Fab,
	Button,
	Body,
	Left,
	Right
} from 'native-base';


import {
	Dimensions,
	StatusBar,
	Alert,
	ScrollView
} from 'react-native';

import FontAwesome, {Icons} from 'react-native-fontawesome';
import Event from '../classes/Event';
import { store } from '../redux/store';

export default class ListaEventos extends React.Component{

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.titulo}`,
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" }
	})

	constructor(props){
		super(props);
		this.state = {
			active: false,
			eventos: []
		}

		store.subscribe( ()=> {
			let events = [];
			for (var i = 0 - 1; i <store.getState().eventos.length; i++) {
				events[i] = new Event(store.getState().eventos[i]);
			}
			this.setState({
				eventos: events
			})
			Alert.alert('DEbug', JSON.stringify(this.state));
		});

	}

	componentWillMount(){
		let ev = new Event();
		ev.getAll();
	}

	_renderList(){
		const items = this.state.eventos.map( (data, i)=>{
			return(
				<ListItem>
					<Body>
						<Text style={{color: "#ffffff"}}> 
							{data.name}
						</Text>
						<Text note style={{color: "#ffffff"}}>
							{data.category}
						</Text>
					</Body>
				</ListItem>
			);
		});
	}

	render(){
		return(
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#02A6A4'} />
				<List>

				</List>
		        <View style={{ flex: 1 }}>
		          <Fab
		            containerStyle={{ }}
		            style={{ backgroundColor: '#02A6A4' }}
		            position="bottomRight"
		            onPress={() =>  this.props.navigation.navigate(`FormsEvents`,{titulo: 'Listado de eventos publicados', side: 'Home', event: false}) }>
		            <Text style={{color:"#ffffff", fontSize: 20}}>
		            	<FontAwesome style={{color:"#ffffff", fontSize: 20}}>{Icons.plus}</FontAwesome>
		            </Text>
		          </Fab>
		        </View>
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