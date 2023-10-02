import { createStackNavigator } from '@react-navigation/stack';
import { Login, ForgotPassword, Register } from '../screens'
import { ROUTES } from '../constants';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword}/>
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.APP} component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;