import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Register from '../screens/auth/Register';
import WorkingMode from '../screens/home/WorkingMode';
import WorkingFinish from '../screens/home/WorkingFinish';
import WalkingMode from '../screens/home/WalkingMode';
import Welcome from '../screens/auth/Welcome';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

function AuthNavigator() {

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.WELCOME} component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword}/>
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;