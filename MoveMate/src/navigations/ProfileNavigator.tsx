import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile/Profile';
import MyAccount from '../screens/profile/MyAccount';
import MyGoals from '../screens/profile/MyGoals';
import Login from '../screens/auth/Login';

import { ROUTES } from '../constants';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator 
    screenOptions={{ headerShown: false, gestureEnabled: false }}
    initialRouteName={ROUTES.PROFILE}>
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.MY_ACCOUNT} component={MyAccount} 
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: " "
        }}
      />
      <Stack.Screen
        name={ROUTES.MY_GOALS}
        component={MyGoals}
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: " ",
          headerStyle: {
            backgroundColor: "#f2f2f2"
          }
        }}
      />
      <Stack.Screen name={ROUTES.LOGIN}component={Login} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;