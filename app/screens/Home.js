import React, { Component } from 'react'
import {
	View,
	Text,
	Container,
	Content,
	Thumbnail
} from 'native-base'

import {
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Image

} from 'react-native'

import MainHeader from '../components/MainHeader'
import Botonera from '../components/Botonera'

export default class Home extends Component {

	constructor(props){
		super(props);
	}

	render(){
		const { width, height } = Dimensions.get('screen')
		return(
				
			<View style={styles.container}>
				<StatusBar translucent={true} backgroundColor={'transparent'}/>
				<MainHeader />
				<Content>
					<Botonera />
				</Content>
					<View style={{ alignSelf: "center",alignContent: "center", alignItems: "center", flex: 0.1, left: 0, right: 0 ,position: "relative", bottom: -10, flexDirection: 'row', alignItems: "center" ,marginBottom : 0}}>
						<View style={{flex: 0.8, alignSelf: "center",alignContent: "center", alignItems: "center"}}>
							<TouchableOpacity>
								<Text style={{color: "#ffffff", alignText: "center"}} > CERRAR SESION</Text>
							</TouchableOpacity>
						</View>
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