import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import FocusStatsChart from '../../components/FocusChart';
// import useAuth from '../../hook/useAuth';
// import { User } from '../../config/firebase/auth';

const Dashboard = () => {
  const navigation = useNavigation();

  // const fetchUserData = async (uid: string) => {
  // const userDoc = await db.collection('users').doc(uid).get();
  // if (userDoc.exists) {
  //   const userData = userDoc.data();
  //   // update state
  // } else {
  //   // handle user not exist
  // }

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Dashboard</Text>
      {/* <BarChart /> */}
      <FocusStatsChart />
      <Button title="Dashboard Detail" onPress={() => navigation.navigate(ROUTES.DASHBOARD_DETAIL) }/>
    </View>
  )

};

export default Dashboard;