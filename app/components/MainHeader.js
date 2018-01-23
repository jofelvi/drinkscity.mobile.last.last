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
	Image
} from 'react-native'


export default class MainHeader extends React.Component{

	constructor(props){
		super(props);
	}


	render(){
		return(
			<View style={styles.header}>
				<Thumbnail ref={{uri: 'http://google.com'}} />
				<Thumbnail style={styles.imgLogo} square ref={{uri: 'http://google.com'}} />
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
		marginTop: 32
	},
	logo: {
		position: "relative",
		marginLeft: 138,
		marginTop: 32
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
	    display: 'block',
		borderStyle: "solid",
	    width: "100%",
	    maxWidth: 150,
	    borderWeight: 1,
	    borderColor: "#00D9C7",
	    margin: 0
	}
}