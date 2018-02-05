import React from 'react';
import {
	View,
	Image,
	StatusBar,
	AsyncStorage,
	Alert
} from 'react-native';
import Connection from '../config/connection'

export default class Splash extends React.Component {
	static navigationOptions = {
		header: null
	}

	async componentDidMount(){
		let session = await AsyncStorage.getItem('@session');
		let oldToken = await JSON.parse(session) || null;

		if( oldToken==null ){
			this.props.navigation.navigate('RootScreen');
			return false;
		}

		let con = new Connection();
		let resp = fetch( con.getUrlApi('products'), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'json',
				Authorization: oldToken.token
			}
		}).then( resp =>{
			if( resp.status == undefined || resp._bodyInit.token == 'Invalid token' ){
				this.props.navigation.navigate('RootScreen');
				return false;
			}
			let session = {
				token: oldToken.token
			};
			this.props.navigation.navigate('HomeScreen',  {token: session});
		});

	}

	render(){
		return(
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#111111'} />
				<View style={styles.ImageCOntent} >
					<Image
						source={require('../assets/img/drinkscity_logo.png')}
						style={{
							marginTop: "50%"
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		backgroundColor: "#111111",
		height: "100%"	
	},
	ImageCOntent: {
		marginTop: 0,
		alignSelf: "center",
		alignContent: "center",
		alignItems: "center"
	}
}