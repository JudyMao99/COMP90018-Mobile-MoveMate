import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import Dashboard from '../screens/dashboard/Dashboard';
import DashboardDetail from '../screens/dashboard/DashboardDetail';
import StepCounterPage from '../screens/dashboard/stepCounterPage';

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.DASHBOARD_MAIN}>
      <Stack.Screen name={ROUTES.DASHBOARD_MAIN} component={Dashboard} />
      <Stack.Screen name={ROUTES.DASHBOARD_DETAIL} component={DashboardDetail}/>
      <Stack.Screen name={ROUTES.STEP_COUNTER} component={StepCounterPage}/>
    </Stack.Navigator>
  )
}

export default DashboardNavigator