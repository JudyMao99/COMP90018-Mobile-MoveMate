import { View, Text, Image } from 'react-native'
import React from 'react';
import { Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const navigation = useNavigation();
  return (
    <>
      <View className="flex flex-1 flex-col items-center justify-center gap-y-9">
        <View className="flex gap-2">
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
            title="Sign In with Google"
            titleStyle={{ fontSize: 20 }}
            icon={
              <View className="mr-2">
                {/* <Icon name='google' type='ant-design' color="#fff" size={28} /> */}
                <Image source={require("../../assets/icons/google.png")} className="w-8 h-8" />
              </View>
            }
            onPress={() => {}}
          />
          {/* <Button title="Go to App" onPress={() => navigation.navigate(ROUTES.APP)}/>
          <Button title="Go to Register" onPress={() => navigation.navigate(ROUTES.REGISTER)}/>
          <Button title="Go to Forgot Password" onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}/> */}
        </View>
      </View>
    </>
  )
}

export default Login