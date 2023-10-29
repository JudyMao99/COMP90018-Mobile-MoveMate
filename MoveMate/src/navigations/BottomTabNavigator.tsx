import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ROUTES } from '../constants';
import { Dashboard, Home, Profile } from '../screens';
import HomeNavigator from './HomeNavigator';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.HOME} component={HomeNavigator} />
      <Tab.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
      <Tab.Screen name={ROUTES.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;