import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Profile</Text>
      <Button title="Profile Detail" onPress={() => navigation.navigate(ROUTES.PROFILE_DETAIL) }/>
    </View>
  )
}

export default Profile