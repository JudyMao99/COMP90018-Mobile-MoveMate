import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Register from '../screens/auth/Register';
import useAuth from '../hook/useAuth';

const Stack = createStackNavigator();

function AuthNavigator() {
  const { user } = useAuth();

  if (user) {
    return (
      <BottomTabNavigator />
    )
  } else {
    return (
      <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword}/>
        <Stack.Screen name={ROUTES.REGISTER} component={Register} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.APP} component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

}

export default AuthNavigator;