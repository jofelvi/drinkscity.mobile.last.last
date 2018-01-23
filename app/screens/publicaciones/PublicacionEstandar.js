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
	ListItem
} from 'native-base';

import {
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Alert
} from 'react-native';

import PubEstandar from '../../components/forms/PubEstandar';


export default class PublicacionEstandar extends React.Component{

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.titulo}`,
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" }
	})

	constructor(props){
		super(props);

	}

	_renderForm(){
		 const { state } = this.props.navigation

		 if( state.params.tipo == 'ESTANDAR' )
		 	return <PubEstandar color={'#ffffff'} />
	}

	render(){
		const { width, height } = Dimensions.get('screen')

		return(
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'transparent'} />
				<Container>
					<Content>
						{this._renderForm()}
					</Content>
				</Container>
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