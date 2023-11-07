import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { ROUTES } from '../constants';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import DashboardNavigator from './DashboardNavigator';
import { Image } from 'react-native';
import { RouteProp, ParamListBase, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function BottomTabNavigator() {

  return (
    <Tab.Navigator
       screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
      name={ROUTES.HOME_NAV} 
      component={HomeNavigator} 
      options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        })}
        />
      <Tab.Screen 
        name={"History"} 
        component={DashboardNavigator} 
        options = {{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
          ),
        }}
      />
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

// Get the current screen name and return nones when in specific page
const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? ROUTES.HOME_NAV;
  if( routeName == ROUTES.WORKING_MODE || routeName == ROUTES.WORKING_FINISH || routeName == ROUTES.WALKING_MODE) {
    return 'none';
  }
  return 'flex';
};


export default BottomTabNavigator;