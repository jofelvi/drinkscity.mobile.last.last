import React from 'react';

import {
	Dimensions,
	Alert,
	Image,
	StatusBar,
	TouchableOpacity
} from 'react-native';

import {

	Body,
	Col,
	Grid,
	Row,
	Container,
	Content,
	View,
	Text,
	H2,
	Thumbnail,
	Input,
	Form,
	Label,
	Item,
	Button

} from 'native-base';

import FontAwesome, {Icons} from 'react-native-fontawesome'


export default class Login extends React.Component {

	constructor(props){
		super(props);

	}


	render(){
		return(
			<View style={styles.container}>
				<StatusBar translucent backgroundColor={'#111111'} />
				<Container>
					<Content>
						<Form>
							<Grid>
								<Row>
									<Col>
										<View style={{alignSelf: "center"}}>
											<Image
												source={require('../assets/img/drinkscity_logo.png')}
												style={{
													marginTop: 7,
													width: 185,
													height: 190
												}}
											/>
										</View>
									</Col>
								</Row>
								<Row>
									<Col style={{width: "95%"}}>
										<Item floatingLabel>
											<Label style={{color: "#ffffff"}}>Correo electronico</Label>
											<Input 
												style={{color: "#ffffff"}}
											/>

										</Item>
									</Col>
								</Row>
								<Row>
									<Col style={{width: "95%"}}>
										<Item floatingLabel>
											<Label style={{color: "#ffffff"}}>Clave</Label>
											<Input 
												style={{color: "#ffffff"}}
												secureTextEntry={true}
											/>

										</Item>
									</Col>
								</Row>
								<Row>
									<Col style={{width: "95%"}}>
										<Button  onPress={()=>{this.props.navigation.navigate('HomeScreen')}} block rounded style={{marginTop: 10}}>
											<Text style={{color: "#ffffff"}}>
												Ingresar
											</Text>
										</Button>
									</Col>
								</Row>
							</Grid>
						</Form>
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