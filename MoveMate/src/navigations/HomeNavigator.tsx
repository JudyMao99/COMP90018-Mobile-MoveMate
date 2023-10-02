import { createStackNavigator } from '@react-navigation/stack';
import { Login, ForgotPassword, Register, Home } from '../screens'
import { ROUTES } from '../constants';
import BottomTabNavigator from './BottomTabNavigator';
import HomeDetail from '../screens/home/HomeDetail';

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.HOME_MAIN} component={Home} />
      <Stack.Screen name={ROUTES.HOME_DETAIL} component={HomeDetail}/>
    </Stack.Navigator>
  );
}

export default HomeNavigator;