import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../constants'

const Login = () => {
  const navigation = useNavigation();
  return (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-4xl font-extrabold">
          <Text className="text-primary-blue">
            Move
          </Text>
          <Text className="text-primary-orange">
            Mate
          </Text>
        </Text>
        <Button title="Go to App" onPress={() => navigation.navigate(ROUTES.APP)}/>
        <Button title="Go to Register" onPress={() => navigation.navigate(ROUTES.REGISTER)}/>
        <Button title="Go to Forgot Password" onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}/>
      </View>
    </>
    // <View className="flex-1 bg-white" 
    // // style={{backgroundColor: themeColors.bg}}
    // >
    //   <SafeAreaView  className="flex ">
    //     <View className="flex-row justify-start">
    //       <TouchableOpacity onPress={()=> navigation.navigate(ROUTES.FORGOT_PASSWORD as never)} 
    //       className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
    //         {/* <ArrowLeftIcon size="20" color="black" /> */}
    //       </TouchableOpacity>
    //     </View>
    //     <View  className="flex-row justify-center">
    //       <Image source={require('../../assets/images/login.png')} 
    //       style={{width: 200, height: 200}} />
    //     </View>
        
        
    //   </SafeAreaView>
    //   <View 
    //     style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
    //     className="flex-1 bg-white px-8 pt-8">
    //       <View className="form space-y-2">
    //         <Text className="text-gray-700 ml-4">Email Address</Text>
    //         <TextInput 
    //           className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
    //           placeholder="email"
    //           value="john@gmail.com" 
    //         />
    //         <Text className="text-gray-700 ml-4">Password</Text>
    //         <TextInput 
    //           className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
    //           secureTextEntry
    //           placeholder="password"
    //           value="test12345" 
    //         />
    //         <TouchableOpacity className="flex items-end">
    //           <Text className="text-gray-700 mb-5">Forgot Password?</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity 
    //           className="py-3 bg-yellow-400 rounded-xl"
    //           onPress={() => {}}
    //           >
    //             <Text 
    //                 className="text-xl font-bold text-center text-gray-700"
    //             >
    //                     Login
    //             </Text>
    //          </TouchableOpacity>
            
    //       </View>
    //       <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
    //       <View className="flex-row justify-center space-x-12">
    //         <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
    //           <Image source={require('../../assets/icons/google.png')} className="w-10 h-10" />
    //         </TouchableOpacity>
    //         <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
    //           <Image source={require('../../assets/icons/apple.png')} className="w-10 h-10" />
    //         </TouchableOpacity>
    //         <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
    //           <Image source={require('../../assets/icons/facebook.png')} className="w-10 h-10" />
    //         </TouchableOpacity>
    //       </View>
    //       <View className="flex-row justify-center mt-7">
    //           <Text className="text-gray-500 font-semibold">
    //               Don't have an account?
    //           </Text>
    //           <TouchableOpacity onPress={()=> navigation.navigate('Register' as never)}>
    //               <Text className="font-semibold text-yellow-500"> Sign Up</Text>
    //           </TouchableOpacity>
    //       </View>
          
    //   </View>
    // </View>
  )
}

export default Login