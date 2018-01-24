import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import CrearProducto from '../screens/CrearProducto';
import PublicacionEstandar from '../screens/publicaciones/PublicacionEstandar';
import Productos from '../screens/Productos';

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
	}
});

export {
	Navigation
}