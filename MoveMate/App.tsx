import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Alert, PermissionsAndroid, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import { useState, useEffect } from 'react';
import { Pedometer, Accelerometer } from 'expo-sensors';
import React from 'react';




export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [isPermissionsAvailable, setIsPermissionsAvailable] = useState('Checking')
  const [permissionRequst, setPermissionRequsts] = useState('')
  const [stepCount, updateStepCount] = useState(0);
  const [subscription, setSubscription] = useState(null);


  
const requestMotionPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      {
        title: 'Cool Exercise App Activity Recognition Permission',
        message:
          'Cool Exercise App needs access to your Activity Data ' +
          'so you can track the activity of user',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the activity permission');
    } else {
      console.log('activity permission denied');
    }
 
};


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
    requestMotionPermission();
    subscribe();
    return _unsubscribe;
  },[]);


  return (
    <View>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>steps: {stepCount}</Text>
    </View>
    
  );
  
}