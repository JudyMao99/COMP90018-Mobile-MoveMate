import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import Dashboard from '../screens/dashboard/Dashboard';
import DashboardDetail from '../screens/dashboard/DashboardDetail';
import MapScreen from '../screens/map/MapScreen';
import BottomTabNavigator from './BottomTabNavigator';
import WorkingMode from '../screens/home/WorkingMode';
import WorkingFinish from '../screens/home/WorkingFinish';
import WalkingMode from '../screens/home/WalkingMode';

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.DASHBOARD_MAIN}>
      <Stack.Screen name={ROUTES.DASHBOARD_MAIN} component={Dashboard} />
      <Stack.Screen name={ROUTES.DASHBOARD_DETAIL} component={DashboardDetail}/>
      <Stack.Screen name={ROUTES.MAP} component={MapScreen} />
      <Stack.Screen name={ROUTES.APP} component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default DashboardNavigator