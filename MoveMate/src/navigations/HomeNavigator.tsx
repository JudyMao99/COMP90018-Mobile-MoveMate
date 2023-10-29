import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import HomeDetail from '../screens/home/HomeDetail';
import Home from '../screens/home/Home';

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