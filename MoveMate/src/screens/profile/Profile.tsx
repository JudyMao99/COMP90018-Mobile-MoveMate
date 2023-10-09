import { View, Text, Button as RNButton, Image, StyleSheet } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';


// useful icons
const arrowRight = require('../../assets/icons/arrow_right.png');

const user = require('../../assets/icons/user.png');

const goal = require('../../assets/icons/goal.png');

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <View className="bg-indigo-500 w-97 h-64 flex flex-col justify-center items-center rounded-lg shadow-xl ">
        <Text className="text-6xl font-black mt-10 pt-12">Vera</Text>
          <View className="bg-white flex-col justify-center items-center w-32 border-2 rounded-lg mt-28">
            <Text className="rounded-lg border-inherit border-solid text-base ">Profile</Text>
          </View>
      </View>

      <View className=" mt-4 flex flex-row items-center">
        <View className="basis-1/12 ml-2">
          <Image source={user} />
        </View>
        <View className=" basis-10/12 mt-4 text-white py-2 px-2 rounded-l-lg mb-4">
          <RNButton title="My Account" onPress={() => navigation.navigate(ROUTES.MY_ACCOUNT)} color="#020617"/>
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
          <RNButton title="My Goals" onPress={() => navigation.navigate(ROUTES.MY_GOALS)} color="#020617" />
        </View>
        <View className="basis-1/12">
          <Image  source={arrowRight} />
        </View>
      </View>
      <View className='flex flex-row justify-center items-center '>
        <RNButton title='Sign Out' onPress={() => navigation.navigate(ROUTES.LOGIN) } color="#020617" />
      </View>
    </View>
    
  );
}



export default Profile