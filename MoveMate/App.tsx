import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Alert, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import React from 'react';






export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');

  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const requestActivityPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Start walking");
    } else {
      Alert.alert("permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
    subscribe();
  },[]);

  const subscribe = async () => {
    const subscription = Pedometer.watchStepCount((result) => {
      console.log("hi")
      setStepCount(result.steps);
      console.log("current steps: " + result.steps);
    })
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
  };

   
  

  return (
    <View>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>steps: {stepCount}</Text>
    </View>
  );
  
}
