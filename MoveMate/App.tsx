import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Alert,StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import React from 'react';




export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [isPermissionsAvailable, setIsPermissionsAvailable] = useState('Checking')
  const [permissionRequst, setPermissionRequsts] = useState('')
  const [stepCount, updateStepCount] = useState(0);
  const [subscription, setSubscription] = useState(null);




  const subscribe = async () => {
    const isPermissionsAvailable = await Pedometer.getPermissionsAsync();
    setIsPermissionsAvailable(String(isPermissionsAvailable));
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    if (isAvailable) {
        Pedometer.watchStepCount((result) => {
          updateStepCount(result.steps);
          console.log(result.steps)
        })
    }
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };


  useEffect(() => {
    subscribe();
    return _unsubscribe;
  },[]);


  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    }}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>steps: {stepCount}</Text>
    </View>
    
  );
  
}