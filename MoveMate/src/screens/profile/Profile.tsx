import { View, Text, Button as RNButton,TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import useAuth from '../../hook/useAuth';
import { User } from 'firebase/auth';

// useful icons
const arrowRight = require('../../assets/icons/arrow_right.png');

const user_icon = require('../../assets/icons/user.png');

const goal = require('../../assets/icons/goal.png');

const Profile = () => {
  const navigation = useNavigation();
  const [userDetail, setUserDetail] = useState<User>();
  const { user } = useAuth();

  return (
    <View className="flex-1">
      <View className="bg-indigo-500 w-97 h-64 flex flex-col justify-center items-center rounded-lg shadow-xl ">
        <Text className="text-6xl font-black mt-20 pt-12">{userDetail?.displayName ?? "Undefined"}</Text>
          <View className="bg-white flex-col justify-center items-center w-32 border-2 rounded-lg mt-20">
            <Text className="rounded-lg border-inherit border-solid text-base ">Profile</Text>
          </View>
      </View>

      <View className=" mt-4 flex flex-row items-center">
        <View className="basis-1/12 ml-2">
          <Image source={user_icon} />
        </View>

        <View className="basis-10/12 mt-4 text-white py-2 px-2 rounded-l-lg mb-4">
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.MY_ACCOUNT)} style={styles.touchable}>
              <Text className="text-neutral-50 text-center">My Account</Text>
          </TouchableOpacity>
        </View>
        
        <View className="basis-1/12">
          <Image  source={arrowRight} />
        </View>
      </View>
      <View className="flex flex-row  items-center">
        <View className="basis-1/12 ml-2">
          <Image source={goal} />
        </View>
        <View className="basis-10/12 mt-4 text-white py-2 px-2 rounded-l-lg mb-4">
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.MY_GOALS)} style={styles.touchable}>
              <Text className="text-neutral-50 text-center">My Goals</Text>
          </TouchableOpacity>
        </View>
        <View className="basis-1/12">
          <Image  source={arrowRight} />
        </View>
      </View>
      <View className='flex flex-row justify-center items-center '>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)} style={styles.touchable}>
              <Text className="text-neutral-50 text-center">Sign Out</Text>
          </TouchableOpacity>
      </View>
    </View>
    
  );
}
const styles = StyleSheet.create({
  touchable: {
      backgroundColor: "#020617",
      padding: 10,
      borderRadius: 5,
  },
});



export default Profile