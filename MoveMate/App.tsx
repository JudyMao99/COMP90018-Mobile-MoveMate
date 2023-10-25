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


