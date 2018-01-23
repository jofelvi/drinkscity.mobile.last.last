import React from 'react';
import {
	View,
	Text,
	Thumbnail,
	Container,
	Content,
	H3
} from 'native-base';

import {
	Image,
	Dimensions
} from 'react-native'


export default class MainHeader extends React.Component{

	constructor(props){
		super(props);
	}


	render(){
		const { width, height} = Dimensions.get('screen')
		return(
			<View style={styles.header}>
				<Image 
					source={require('../assets/img/portada.jpeg')} 
					style={{
						maxHeight: 120,
						maxWidth:  width
					}}
				/>
				<Thumbnail style={styles.imgLogo} square source={require('../assets/img/cafe.jpeg')} />
				<View style={styles.logo}>

					<H3 style={styles.logoText}>Mi negocio</H3>
					<Text style={styles.logoTextP}>minegocio@gmail.com</Text>

				</View>

			</View>
		);
	}

}

const styles = {
	header: {
		position: "relative",
		marginTop: 0
	},
	logo: {
		position: "relative",
		marginLeft: 138,
		marginTop: 2
	},
	logoText: {
		marginBottom: 0,
		marginTop: 10,
		color: "#ffffff",
		fontSize: 30

	},
	logoTextP:{
		marginTop: 0,
		fontSize: 12,
		color: "#ffffff"		
	},
	imgLogo:{
		position: "absolute",
		top: 95,
		left: 20,
		width: 100,
		height: 100
	}
}