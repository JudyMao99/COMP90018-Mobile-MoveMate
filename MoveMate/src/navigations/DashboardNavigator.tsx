import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import Dashboard from '../screens/dashboard/Dashboard';
import DashboardDetail from '../screens/dashboard/DashboardDetail';
import MapScreen from '../screens/map/MapScreen';

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.DASHBOARD_MAIN}>
      <Stack.Screen name={ROUTES.DASHBOARD_MAIN} component={Dashboard} />
      <Stack.Screen name={ROUTES.DASHBOARD_DETAIL} component={DashboardDetail}/>
      {/* <Stack.Screen name={ROUTES.MAP} component={MapScreen} /> */}
    </Stack.Navigator>
  )
}

export default DashboardNavigator