import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Input from '../../components/Input';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        console.log('got error: ', err.message);
      }
    }
  }

  return (
    <>
      <View className="flex-1 bg-white justify-center">
        <View className="flex-1 bg-white px-8 pt-8 justify-center">
        <SafeAreaView className="flex justify-center items-center mb-8">
          <Text className="font-extrabold text-4xl text-yellow-500 opacity-80">
            LOG IN
          </Text>
        </SafeAreaView>
        <View className="form space-y-2">
          <Input
            title="Email Address"
            value={email}
            placeholder="Enter Email"
            onChangeText={(val: string) => setEmail(val)}
          />
          <View>
            <Input
              title="Password"
              value={password}
              placeholder="Enter Password"
              onChangeText={(val: string) => setPassword(val)}
              secureTextEntry
            />
            <TouchableOpacity className="flex items-end w-fit" >
              <Text className="text-gray-700 mb-5" onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="py-3 bg-yellow-400 rounded-2xl" onPress={handleLogin}>
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
          
        </View>
        {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/google.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/apple.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/facebook.png')} className="w-10 h-10" />
          </TouchableOpacity>
        </View> */}
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate(ROUTES.REGISTER)}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
  )
}

export default Login