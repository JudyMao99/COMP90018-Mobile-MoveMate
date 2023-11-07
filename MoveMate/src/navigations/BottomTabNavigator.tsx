import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { ROUTES } from '../constants';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import DashboardNavigator from './DashboardNavigator';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, ParamListBase, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function BottomTabNavigator() {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name={ROUTES.HOME_NAV} 
        component={HomeNavigator} 
        options={
          ({ route }) => ({
            tabBarStyle: { display: getTabBarVisibility(route) },
            tabBarIcon: ({ color, size }) => <Ionicons name="home-sharp" color={color} size={size} />,
            tabBarLabel: "Home",
          })
        }
      />
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart-sharp" color={color} size={size} />,
          tabBarLabel: "History",
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE_NAVIGATION}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-sharp" color={color} size={size} />,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

// Get the current screen name and return nones when in specific page
const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? ROUTES.HOME_NAV;
  if( routeName == ROUTES.WORKING_MODE || routeName == ROUTES.WORKING_FINISH || routeName == ROUTES.WALKING_MODE || routeName == ROUTES.MAP) {
    return 'none';
  }
  return 'flex';
};


export default BottomTabNavigator;