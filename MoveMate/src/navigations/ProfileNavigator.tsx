
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard, Profile } from '../screens'
import { ROUTES } from '../constants';
import DashboardDetail from '../screens/dashboard/DashboardDetail';
import ProfileDetail from '../screens/profile/ProfileDetail';

const Stack = createStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.PROFILE_MAIN} component={Profile} />
      <Stack.Screen name={ROUTES.PROFILE_DETAIL} component={ProfileDetail}/>
    </Stack.Navigator>
  );
}

export default ProfileNavigator;