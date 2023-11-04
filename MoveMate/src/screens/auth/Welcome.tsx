import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';


const Welcome = () => {
  const navigation = useNavigation();
  return (
    <>
      <View className="flex flex-1 flex-col items-center justify-center gap-y-9">
        <View className="flex gap-4">
          <Icon name='clockcircle' type='ant-design' color='#0099FA' size={144} />
          <Text className="font-black font-extrabold text-4xl">
            <Text className="text-sky-600 opacity-80">Move</Text>
            <Text className="text-amber-400 opacity-80">Mate</Text>
          </Text>
        </View>
        <View className="w-72">
          <Button
            size="lg"
            radius="xl"
            title="Sign Up"
            titleStyle={{ fontSize: 20 }}
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
          />
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate(ROUTES.LOGIN)}>
              <Text className="font-semibold text-sky-600"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default Welcome;