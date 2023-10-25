import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import React from 'react';
import { FAB, Button, Dialog, Icon} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const WalkingMode = ({route}: any) => {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [isPermissionsAvailable, setIsPermissionsAvailable] = useState('Checking')
    const [permissionRequst, setPermissionRequsts] = useState('')
    const [stepCount, updateStepCount] = useState(0);
    const [subscription, setSubscription] = useState(null);
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const [iconName, setIconName] = React.useState('pause');
    const [running, setRunning] = React.useState(true);

    // Handle the pase function
    const pauseHandler = () => {
    if (iconName === 'pause') {
      setIconName('play');
      setRunning(false);
    }
    else {
      setIconName('pause');
      setRunning(true);
    }
  }


    // Subscirbe the Pedometer and update it 
    const subscribe = async () => {
    const isPermissionsAvailable = await Pedometer.getPermissionsAsync();
    setIsPermissionsAvailable(String(isPermissionsAvailable));
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    if (isAvailable) {
    Pedometer.watchStepCount((result) => {
        updateStepCount(result.steps);
        console.log(result.steps) })
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

    // TODO: Write the step count down into the view
    return (
    <View className="flex flex-1 items-center w-screen h-screen ">  
      <View className="bg-sky-500 h-3/4 w-full flex items-center justify-around ">
        
      </View>
      <View className='flex-row w-full justify-around relative bottom-12'>

      <Button
          icon={{
            name: 'close',
            type: 'font-awesome',
            color: '#0ea5e9',
            size: 40
          }}
          buttonStyle={{
            backgroundColor: 'white',
            height: 100,
            width: 100,
            borderColor: '#0ea5e9',
            borderWidth: 5
          }}
          raised
          radius={50}
          onPress={() => {
            setVisible(true);
            setRunning(false);
          }}
        />

        <Button
          icon={{
            name: iconName,
            type: 'font-awesome',
            color: '#0ea5e9',
            size: 40
          }}
          buttonStyle={{
            backgroundColor: 'white',
            height: 100,
            width: 100,
            borderColor: '#0ea5e9',
            borderWidth: 5
          }}
          raised
          radius={50}
          onPress={pauseHandler}
        />
      </View>

      <Dialog
        isVisible={visible}
      >
        <Dialog.Title title="" />
        <Text>Sure to terminate Walking?</Text>
        <Dialog.Actions>
          <Dialog.Button title="Yes" onPress={() => navigation.navigate(ROUTES.HOME)}/>
          <Dialog.Button title="Close" onPress={() => {
              setVisible(false)
              setRunning(true);
            }
          }/>
        </Dialog.Actions>
      </Dialog>
    </View>
  )





}

export default WalkingMode
  
