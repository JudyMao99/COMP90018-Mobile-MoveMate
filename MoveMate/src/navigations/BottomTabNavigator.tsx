import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ROUTES } from '../constants';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import DashboardNavigator from './DashboardNavigator';
import { Image } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.HOME_NAV} component={HomeNavigator} />
      <Tab.Screen name={ROUTES.DASHBOARD} component={DashboardNavigator} />
      <Tab.Screen
        name={ROUTES.PROFILE_NAVIGATION}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('../assets/icons/profile.png')} style={{ tintColor: color }} />
          ),
          tabBarLabel: undefined,
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;