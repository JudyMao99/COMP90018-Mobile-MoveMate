import useHealthData from './src/hooks/useHealthData';
import { View, Text } from 'react-native'
import React from 'react'

const stepCouterPage = () => {
    const {steps, distance, flights} = useHealthData();
  
    return (
    <View>
      <Text>Dashboard</Text>
      
    </View>
  )
}
