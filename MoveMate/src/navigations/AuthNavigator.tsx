import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Register from '../screens/auth/Register';
import WorkingMode from '../screens/home/WorkingMode';
import WorkingFinish from '../screens/home/WorkingFinish';
import WalkingMode from '../screens/home/WalkingMode';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword}/>
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.APP} component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.WORKING_MODE} component={WorkingMode} initialParams={{duration: 15}} options={{ headerShown: false, gestureEnabled: false }}/>
      <Stack.Screen name={ROUTES.WORKING_FINISH} component={WorkingFinish} options={{ headerShown: false,gestureEnabled: false }}/>
      <Stack.Screen name={ROUTES.WALKING_MODE} component={WalkingMode} options={{headerShown: false, gestureEnabled: false}}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthNavigator;