import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import {
GoogleAuthProvider,
onAuthStateChanged,
signInWithCredential,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();


const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Google Login
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "567092706586-8tlk7ariv0erl08nb9bmn69mhva2ncof.apps.googleusercontent.com",
    androidClientId: "567092706586-23l8rda3a1a2a4fcnrnss0u4ehpcbiob.apps.googleusercontent.com"
  })

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response. params;
      const credential = GoogleAuthProvider. credential(id_token);
      signInWithCredential(auth, credential);
    }
  },[response])
  

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
        <SafeAreaView className="flex justify-center items-center mb-4">
          <Text className="font-extrabold text-4xl text-yellow-500 opacity-80">
            LOG IN
          </Text>
        </SafeAreaView>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput 
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="email"
            value={email}
            onChangeText={(val: string) => setEmail(val)}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput 
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(val: string) => setPassword(val)}
          />
          <TouchableOpacity className="flex items-end w-fit" >
            <Text className="text-gray-700 mb-5" onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>Forgot Password?</Text>
          </TouchableOpacity>
            <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={handleLogin}>
              <Text className="text-xl text-center text-white">
                Log In
              </Text>
            </TouchableOpacity>
          
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" onPress={() => promptAsync()}>
            <Image source={require('../../assets/icons/google.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/apple.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/facebook.png')} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
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