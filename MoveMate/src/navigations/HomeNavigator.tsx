import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import Home from '../screens/home/Home';
import WorkingMode from '../screens/home/WorkingMode';
import WorkingFinish from '../screens/home/WorkingFinish';
import WalkingMode from '../screens/home/WalkingMode';

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.HOME_MAIN}>
      <Stack.Screen name={ROUTES.HOME_MAIN} component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name={ROUTES.WORKING_MODE} component={WorkingMode} initialParams={{duration: 15}} options={{ headerShown: false, gestureEnabled: false }}/>
      <Stack.Screen name={ROUTES.WORKING_FINISH} component={WorkingFinish} options={{ headerShown: false,gestureEnabled: false }}/>
      <Stack.Screen name={ROUTES.WALKING_MODE} component={WalkingMode} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default HomeNavigator;