import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Register from '../screens/auth/Register';
import Welcome from '../screens/auth/Welcome';
import MyGoals from '../screens/profile/MyGoals';

const Stack = createStackNavigator();

function AuthNavigator() {

  return (
      <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.WELCOME}>
        <Stack.Screen name={ROUTES.WELCOME} component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword}/>
        <Stack.Screen name={ROUTES.REGISTER} component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
}

export default AuthNavigator;