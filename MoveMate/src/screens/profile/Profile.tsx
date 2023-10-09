import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';

const Profile = () => {
  const navigation = useNavigation();
  const handleSignOut = async () => {
    await signOut(auth);
  }

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Profile</Text>
      <Button title="Profile Detail" onPress={() => navigation.navigate(ROUTES.PROFILE_DETAIL) }/>
      <Button title="Sign Out" onPress={handleSignOut}/>
    </View>
  )
}

export default Profile