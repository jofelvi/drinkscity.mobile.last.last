import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StatusBar,
  Linking
} from 'react-native';
import Camera from 'react-native-camera';

export default class QRScaner extends Component {
	static navigationOptions = ({navigation}) => ({
		headerTintColor: "#ffffff",
		headerStyle: { backgroundColor: "#02A6A4" },
		title: 'Validacion de orden mediante QR'
	});

  constructor(props){
    super(props);
    this.state = {
      onBarCodeRead: this._onBarCodeRead
    }
  }

  componentWillMount(){
    this.setState({
      camera : {
        onBarCodeRead: this.onBarCodeRead
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#02A6A4'} />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          	barCodeTypes={[Camera.constants.BarCodeType.qr]}
	  		onBarCodeRead={this.state.onBarCodeRead}
         	style={styles.preview}
          	aspect={Camera.constants.Aspect.fill}>
        </Camera>
      </View>
    );
  }

  _onBarCodeRead=(e)=>{
    this.camera.stopCapture();
    this.setState({
      onBarCodeRead: null
    });
     this.props.navigation.navigate('onScanner', {scanData: e});

     setTimeout(()=>{
      this.setState({
        onBarCodeRead: this._onBarCodeRead
      });
     },4000)

  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});