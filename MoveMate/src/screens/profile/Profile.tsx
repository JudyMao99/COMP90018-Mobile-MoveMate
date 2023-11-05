import { View, Text,TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import useAuth from '../../hook/useAuth';
import { getAuth, signOut } from 'firebase/auth';
import { Icon } from '@rneui/themed';

// icons
const arrowRight = require('../../assets/icons/arrow_right.png');
const user_icon = require('../../assets/icons/user.png');
const goal = require('../../assets/icons/goal.png');

const Profile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate(ROUTES.LOGIN);
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View className="flex-1">
      <View className="relative bg-brand h-64 flex justify-center items-center rounded-lg shadow-xl">
        <Text className="text-6xl font-black mt-16 text-white">
          {user?.displayName ?? "Undefined"}
        </Text>
        <View className="absolute -bottom-6 flex justify-center items-center bg-white w-44 h-12 rounded-full">
          <Text className="font-bold text-lg">
            Profile
          </Text>
        </View>
      </View>
      <View className="mt-20 flex-1 flex-col px-6 items-center">
        <View className="flex flex-row items-center gap-x-5 mb-8">
          <Image source={user_icon} />
          <TouchableOpacity className="flex-1 flex-row items-center justify-between" onPress={() => navigation.navigate(ROUTES.MY_ACCOUNT)}>
            <Text className="font-extrabold text-lg">
              My Account
            </Text>
            <Image source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center gap-x-5">
          <Image source={goal} style={{ width: 28, height: 28 }} />
          <TouchableOpacity className="flex-1 flex-row items-center justify-between" onPress={() => navigation.navigate(ROUTES.MY_GOALS)}>
            <Text className="font-extrabold text-lg">
              My Goals
            </Text>
            <Image source={arrowRight} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="py-3 bg-brand rounded-full w-48 mt-56" onPress={handleSignOut}>
          <Text className="text-2xl font-bold text-center text-white">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

export default Profile