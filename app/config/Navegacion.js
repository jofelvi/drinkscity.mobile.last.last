import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';


const Navigation = StackNavigator({
	RootScreen: {
		screen: Home,
		navigationOptions: {
			header: false
		}
	}
});

export {
	Navigation
}