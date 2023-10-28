import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import InitAvatar from '../screens/auth/InitAvatar';
import InitGoals from '../screens/auth/InitGoals';

const Stack = createStackNavigator();


const UserSetupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.SETUP_AVATAR}>
      <Stack.Screen name={ROUTES.SETUP_AVATAR} component={InitAvatar} options={{ headerShown: false }}/>
      <Stack.Screen name={ROUTES.SETUP_GOAL} component={InitGoals} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default UserSetupNavigator