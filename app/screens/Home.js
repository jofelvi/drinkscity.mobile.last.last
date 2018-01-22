import { Component } from 'react'
import {
	View,
	Text,
	Container,
	Content
} from 'native-base'


export default class Home extends Component {

	constructorn(props){
		super(props);
	}


	render(){
		return(
			<Container>
				<Text>Hola Mundo</Text>
			</Container>
		);
	}

}