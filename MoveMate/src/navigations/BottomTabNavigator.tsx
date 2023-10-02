import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ROUTES } from '../constants';
import { Profile } from '../screens';
import HomeNavigator from './HomeNavigator';
import DashboardNavigator from './DashboardNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.HOME} component={HomeNavigator} />
      <Tab.Screen name={ROUTES.DASHBOARD} component={DashboardNavigator} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;