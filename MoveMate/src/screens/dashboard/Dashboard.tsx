import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Dashboard</Text>
      <BarChart />
      <LineChart />
      <Button title="Dashboard Detail" onPress={() => navigation.navigate(ROUTES.DASHBOARD_DETAIL) }/>
    </View>
  )
}

export default Dashboard;