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
  render() {
    return (
      <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#02A6A4'} />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          	barCodeTypes={[Camera.constants.BarCodeType.qr]}
	  		onBarCodeRead={this.onBarCodeRead.bind(this)}
         	style={styles.preview}
          	aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  onBarCodeRead(e) {
    Alert.alert('DEBUG', JSON.stringify(e));
    this.camera.stopCapture();
    Linking.openURL(e.data).catch(err => Alert.alert('An error occurred', err));
    this.props.navigation.goBack();
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