import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import InitAvatar from '../screens/auth/InitAvatar';
import InitGoals from '../screens/auth/InitGoals';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const UserSetupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }} initialRouteName={ROUTES.SETUP_AVATAR}>
      <Stack.Screen name={ROUTES.SETUP_AVATAR} component={InitAvatar} options={{ headerShown: false }}/>
      <Stack.Screen name={ROUTES.SETUP_GOAL} component={InitGoals}
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: " ",
          headerStyle: {
            backgroundColor: "#f2f2f2"
          }
        }}
      />
      <Stack.Screen name={ROUTES.APP} component={BottomTabNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default UserSetupNavigator