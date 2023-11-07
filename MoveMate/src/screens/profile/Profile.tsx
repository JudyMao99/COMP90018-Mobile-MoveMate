import { View, Text,TouchableOpacity, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import useAuth from '../../hook/useAuth';
import { getAuth, signOut } from 'firebase/auth';
import { Icon } from '@rneui/themed';

const Profile = () => {
  const navigation = useNavigation();
  // const { user } = useAuth();
  
  const auth = getAuth();
  const user = auth.currentUser;


  const [displayName, setDisplayName] = useState<string>();
  
  useFocusEffect(
    useCallback(() => {
      setDisplayName(user?.displayName ?? "undefined");
    }, [])
  );

  useEffect(() => {
    setDisplayName(user?.displayName ?? "undefined");
  }, [])
  
  

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View className="flex-1">
      <View className="relative bg-blue-brand h-64 flex justify-center items-center rounded-lg shadow-xl">
        <Text className="text-6xl font-black mt-16 text-white">
          {displayName}
        </Text>
        <View className="absolute -bottom-6 flex justify-center items-center bg-white w-44 h-12 rounded-full">
          <Text className="font-bold text-lg">
            Profile
          </Text>
        </View>
      </View>
      <View className="mt-20 flex-1 flex-col px-6 items-center">
        <View className="flex flex-row items-center gap-x-5 mb-8">
          <Icon name='user' type='font-awesome' color='#2089DC' size={32} />
          <TouchableOpacity className="flex-1 flex-row items-center justify-between" onPress={() => navigation.navigate(ROUTES.MY_ACCOUNT)}>
            <Text className="font-extrabold text-lg">
              My Account
            </Text>
            <Icon name='right' type='ant-design' color='#777' size={24} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center gap-x-5">
          <Icon name='medal' type='font-awesome-5' color='#2089DC' size={28} />
          <TouchableOpacity className="flex-1 flex-row items-center justify-between" onPress={() => navigation.navigate(ROUTES.MY_GOALS)}>
            <Text className="font-extrabold text-lg">
              My Goals
            </Text>
            <Icon name='right' type='ant-design' color='#777' size={24} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="py-3 bg-blue-brand rounded-full w-48 mt-56" onPress={handleSignOut}>
          <Text className="text-xl font-bold text-center text-white">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

export default Profile