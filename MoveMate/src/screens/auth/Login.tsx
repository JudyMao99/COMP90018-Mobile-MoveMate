import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
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
        Alert.alert('got error: ', err.message);
      }
    } else {
      Alert.alert("please provide valid email address and password.")
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
          </View>
          <TouchableOpacity className="py-3 bg-yellow-400 rounded-2xl" onPress={handleLogin}>
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
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