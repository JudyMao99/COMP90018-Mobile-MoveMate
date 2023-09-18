import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Home</Text>
      <Button title="Home Detail" onPress={() => navigation.navigate(ROUTES.HOME_DETAIL) }/>
    </View>
  )
}

export default Home