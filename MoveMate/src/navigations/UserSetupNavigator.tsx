import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import MyGoals from '../screens/profile/MyGoals';
import MyAvatar from '../screens/auth/MyAvatar';

const Stack = createStackNavigator();


const UserSetupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.SETUP_GOAL}>
      <Stack.Screen name={ROUTES.SETUP_GOAL} component={MyGoals} options={{ headerShown: false }}/>
      <Stack.Screen name={ROUTES.SETUP_AVATAR} component={MyAvatar} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default UserSetupNavigator