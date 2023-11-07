import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import Dashboard from '../screens/dashboard/Dashboard';
import MapScreen from '../screens/map/MapScreen';

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }} initialRouteName={ROUTES.DASHBOARD_MAIN}>
      <Stack.Screen name={ROUTES.DASHBOARD_MAIN} component={Dashboard} />
    </Stack.Navigator>
  )
}

export default DashboardNavigator