import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import CrearProducto from '../screens/CrearProducto';
import PublicacionEstandar from '../screens/publicaciones/PublicacionEstandar';
import Productos from '../screens/Productos';
import Funcionarios from '../screens/Funcionarios';
import AboutFuncionario from '../screens/AboutFuncionario';
import QRScaner from '../screens/QRScaner';
import onQRScann from '../screens/onQRScann';
import ListFormsEvents from '../screens/ListFormsEvents';
import { Platform, StatusBar } from 'react-native';

import FormEvent from '../components/forms/FormEvent';

const Navigation = StackNavigator({
	RootScreen: {
		screen: Home,
		navigationOptions: {
			header: false
		}
	},
	PerfilScreen: {
		screen: Perfil
	},
	CrearProductosScreen: {
		screen: CrearProducto
	},
	Estandar: {
		screen: PublicacionEstandar
	},
	Productos:{
		screen: Productos
	},
	BtnFuncionarios:{
		screen: Funcionarios
	},
	FormFuncionario: {
		screen: AboutFuncionario
	},
	QRScanner:{
		screen: QRScaner
	},
	onScanner:{
		screen:onQRScann
	},
	FormsEvents: {
		screen: ListFormsEvents
	},
	FormEvent:{
		screen: FormEvent
	}
},{
   cardStyle: {
     paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
   }
});

export {
	Navigation
}