import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile/Profile';
import MyAccount from '../screens/profile/MyAccount';
import MyGoals from '../screens/profile/MyGoals';

import { ROUTES } from '../constants';

const Stack = createStackNavigator();

const ProfileNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.PROFILE}>
            <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
            <Stack.Screen name={ROUTES.MY_ACCOUNT} component={MyAccount} />
            <Stack.Screen name={ROUTES.MY_GOALS}component={MyGoals} />
        </Stack.Navigator>
    );
};

export default ProfileNavigation;