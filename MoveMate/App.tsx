import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';

export default function App() {
  return (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
  );
}

