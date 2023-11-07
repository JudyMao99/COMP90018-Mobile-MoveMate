import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Welcome from '../screens/auth/Welcome';

const Stack = createStackNavigator();

function AuthNavigator() {

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }} initialRouteName={ROUTES.WELCOME} >
      <Stack.Screen name={ROUTES.WELCOME} component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;