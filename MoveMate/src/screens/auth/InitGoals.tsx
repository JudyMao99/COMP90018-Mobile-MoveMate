import { View, Text } from 'react-native'
import React from 'react'
import MyGoals from '../profile/MyGoals'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const InitGoals = () => {
  const navigation = useNavigation();
  return (
    <View className="flex justify-center items-center">
      <MyGoals nextStep={() => navigation.navigate(ROUTES.APP)}/>
    </View>
  )
}

export default InitGoals