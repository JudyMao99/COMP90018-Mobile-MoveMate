import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { UserCredential, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Input from '../../components/Input';

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred: UserCredential) => {
          updateProfile(cred.user, {
            displayName : username
          })
        })
        .then(() => console.log("username added!"))
        .catch((err: any) => {
          if (err.message === "Firebase: Error (auth/email-already-in-use).") {
            Alert.alert("The email entered has already been used, please try another one.");
          }
        })
    } else {
      Alert.alert("please provide valid email address and password.")
    }
  }

  return (
    <>
      <View className="flex-1 bg-white px-8 pt-8 justify-center">
        <SafeAreaView className="flex justify-center items-center mb-6">
          <Text className="font-extrabold text-4xl text-sky-600">
            SIGN UP
          </Text>
        </SafeAreaView>
        <View className="form space-y-2">
          <Input
            title="User Name"
            value={username}
            placeholder="Enter User Name"
            onChangeText={(val: string) => setUsername(val)}
          />
          <Input
            title="Email Address"
            value={email}
            placeholder="Enter Email"
            onChangeText={(val: string) => setEmail(val)}
          />
          <Input
            title="Password"
            value={password}
            placeholder="Enter Password"
            onChangeText={(val: string) => setPassword(val)}
            secureTextEntry
          />
          <TouchableOpacity className="py-3 bg-sky-600 rounded-2xl" onPress={handleSubmit}>
            <Text className="text-xl font-bold text-center text-white">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">Already have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate(ROUTES.LOGIN)}>
            <Text className="font-semibold text-sky-700"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Register