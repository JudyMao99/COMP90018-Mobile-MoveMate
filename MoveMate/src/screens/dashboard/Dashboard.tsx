import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import BarChart from '../../components/BarChart';
import FocusStatsChart from '../../components/FocusChart';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Dashboard</Text>
      <BarChart />
      <FocusStatsChart />
      <Button title="Dashboard Detail" onPress={() => navigation.navigate(ROUTES.DASHBOARD_DETAIL) }/>
    </View>
  )
}

export default Dashboard;