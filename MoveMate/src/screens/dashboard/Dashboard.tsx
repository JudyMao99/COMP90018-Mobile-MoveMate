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
      <Button title="Map" onPress={() => navigation.navigate(ROUTES.MAP) }/>
    </View>
  )
}

export default Dashboard;