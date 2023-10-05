import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import useHealthData from './src/hook/useHealthData';


export default function App() {
  const { steps, flights, distance } = useHealthData();


  return (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
  );
}

