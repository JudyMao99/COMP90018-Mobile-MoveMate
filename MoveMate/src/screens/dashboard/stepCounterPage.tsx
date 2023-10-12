//import useHealthData from '../../hook/useHealthData';
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Pedometer} from 'expo-sensors';



const StepCounterPage = () => {
  const [isRequest, setRequest] = useState("checking");
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    const isPermission = await Pedometer.getPermissionsAsync();
    setIsPedometerAvailable(String(isAvailable));
    setRequest(String(isPermission));
    if (isPermission) {
      console.log(isPermission);
    }

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

    return (
    
  )
}


export default StepCounterPage;
    
