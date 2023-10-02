
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '../screens'
import { ROUTES } from '../constants';
import DashboardDetail from '../screens/dashboard/DashboardDetail';

const Stack = createStackNavigator();

function DashboardNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.DASHBOARD_MAIN} component={Dashboard} />
      <Stack.Screen name={ROUTES.DASHBOARD_DETAIL} component={DashboardDetail}/>
    </Stack.Navigator>
  );
}

export default DashboardNavigator;