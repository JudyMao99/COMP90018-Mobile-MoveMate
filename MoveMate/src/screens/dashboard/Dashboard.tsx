import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Dashboard</Text>
      <Button title="Dashboard Detail" onPress={() => navigation.navigate(ROUTES.DASHBOARD_DETAIL) }/>
      <Button title="StepCounter" onPress={() => navigation.navigate(ROUTES.STEP_COUNTER) }/>
    </View>
  )
}

export default Dashboard;