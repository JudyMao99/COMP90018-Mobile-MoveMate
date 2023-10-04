// import { View, Text, Button } from 'react-native'
import { View, Text, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import Button from '@ant-design/react-native/lib/button';


const Home = () => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Home</Text>
      {/* <Button title="Home Detail" onPress={() => navigation.navigate(ROUTES.HOME_DETAIL) }/> */}

      {/* ant design 组件 */}
      <Button type="primary" onPress={() => navigation.navigate(ROUTES.HOME_DETAIL) }> Home detail</Button>
      {/* <Checkbox>check test</Checkbox> */}
      </View>
  )
}

export default Home