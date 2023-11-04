import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { Button, Dialog } from '@rneui/themed';
import { UserCredential, createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred: UserCredential) => {
          updateProfile(cred.user, {
            displayName : username
          })
        })
        .then(() => console.log("username added!"))
        .catch((err: any) => {
        console.log('got error: ', err.message);
      })
    } else {
      console.log("please provide valid email address and password.")
    }
  }

  return (
    <>
      <Dialog
        isVisible={dialogVisible}
        // onBackdropPress={toggleDialog2}
      >
        <Dialog.Title title="Upload Avatar"/>
        <View className="flex flex-row">
          <Text className="text-gray-500">Welcome! Please upload your avatar!</Text>
        </View>

        <Dialog.Actions>
          <Dialog.Button title="Skip" onPress={() => setDialogVisible(false)}/>
        </Dialog.Actions>
      </Dialog>
      <View className="flex-1 bg-white px-8 pt-8 justify-center">
        <SafeAreaView className="flex justify-center items-center mb-4">
          <Text className="font-extrabold text-4xl  text-sky-600">
            SIGN UP
          </Text>
        </SafeAreaView>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">User Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={username}
            onChangeText={(val: string) => setUsername(val)}
            placeholder='Enter User Name'
          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            onChangeText={(val: string) => setEmail(val)}
            placeholder='Enter Email'
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            value={password}
            onChangeText={(val: string) => setPassword(val)}
            placeholder='Enter Password'
          />
          <Button size="lg" radius="md" title="Sign Up" onPress={handleSubmit} />
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/google.png')} 
              className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/apple.png')} 
              className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/facebook.png')} 
              className="w-10 h-10" />
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