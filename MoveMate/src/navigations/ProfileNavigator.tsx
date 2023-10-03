import React from 'react';
import { ROUTES } from '../constants';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile/Profile';
import ProfileDetail from '../screens/profile/ProfileDetail';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.PROFILE_MAIN}>
      <Stack.Screen name={ROUTES.PROFILE_MAIN} component={Profile} />
      <Stack.Screen name={ROUTES.PROFILE_DETAIL} component={ProfileDetail}/>
    </Stack.Navigator>
  )
}

export default ProfileNavigator