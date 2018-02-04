import React from 'react';
import {
	Container,
	Content,
	View,
	Text,
	List,
	ListItem,
	Label,
	Fab,
	Button,
	Body,
	Left,
	Right,
	CardItem,
	Card
} from 'native-base';

 
import {
	Dimensions,
	StatusBar,
	Alert,
	ScrollView,
	WebView,
	TouchableOpacity
} from 'react-native';

import YouTube from 'react-native-youtube'
import { MenuProvider } from 'react-native-popup-menu';
import { PopMenu } from '../components/PopupMenu'

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
			eventos: [],
			menuActive :false
		}

		store.subscribe( ()=> {
			let events = [];
			for (var i = 0 - 1; i <store.getState().eventos.length; i++) {
				events[i] = ( ! (store.getState().eventos[i] instanceof Event) ) 
							? new Event(store.getState().eventos[i])
							: store.getState().eventos[i];
			}
			this.setState({
				eventos: events
			});
		});

	}

	componentWillMount(){
		let ev = new Event();
		ev.getAll();
	}

	_showVideoByLink(link = null){
		let video = new String(link);
		let id = video.split('watch?v=');
		return id[0]+'embed/'+id[1];
	}


	_onUpdate = (data) =>{
		let events = this.state.eventos.map((event) =>{
			if(event.data.id == data.id)
				return new Event(data);
			return event;
		});

		this.setState({
			eventos: events
		});
	}

	_renderList(){
		const items = this.state.eventos.map( (data, i)=>{
			return(
					<Card>
						<CardItem>
							<Left />
							<Body />
							<Right>
								<PopMenu onUpdate={this._onUpdate}  navigation={this.props.navigation} evento={data} eventos={this.state.eventos} />
							</Right>
						</CardItem>
						<CardItem cardBody>
							<WebView
								source={{ uri : this._showVideoByLink(data.data.video_link) }}
								style={{ height: 300, width: "100%" }}
							/>
						</CardItem>
						<CardItem>
							<Left>
								<Button transparent>
									<Text style={{color: "#02A6A4"}}>
										{data.data.name}
									</Text>
								</Button>
							</Left>
							<Body>
								<Button transparent>
									<Text style={{color: "#02A6A4"}}>
										<FontAwesome style={{color: "#02A6A4", fontSize: 16}}>
											{Icons.bookmark}
										</FontAwesome> {data.data.category}
									</Text>
								</Button>
							</Body>
						</CardItem>
					</Card>
			);
		});

		return items;
	}

	render(){
		return(
			<MenuProvider>
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#02A6A4'} />
				<ScrollView>
					{this._renderList()}
				</ScrollView>
		        <View style={{ flex: 1 }}>
		          <Fab
		            containerStyle={{ }}
		            style={{ backgroundColor: '#02A6A4' }}
		            position="bottomRight"
		            onPress={() =>  this.props.navigation.navigate(`FormsEvents`,{meth: 'POST', titulo: 'Listado de eventos publicados', side: 'Home', event: false}) }>
		            <Text style={{color:"#ffffff", fontSize: 20}}>
		            	<FontAwesome style={{color:"#ffffff", fontSize: 20}}>{Icons.plus}</FontAwesome>
		            </Text>
		          </Fab>
		        </View>
			</View>
			</MenuProvider>
		);
	}
}


const styles = {
	container: {
		backgroundColor: "#111111",
		flex: 1,
	}
}