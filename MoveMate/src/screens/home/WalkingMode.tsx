import 'react-native-gesture-handler';
import { Text, View, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import React from 'react';
import { FAB, Button, Dialog, Icon} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc,Timestamp} from "firebase/firestore";
import useAuth from '../../hook/useAuth';


const walkingImage = require('../../assets/images/walking.png')
const WalkingMode = () => {
    const [isPedometerAvailable, setPedometerAvailable] = useState('checking');
    const [stepCount, updateStepCount] = useState(0);
    //const [subscription, setSubscription] = useState(null);
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const [iconName, setIconName] = React.useState('pause');
    const [running, setRunning] = React.useState(true);

    const { user } = useAuth();
    
  

    // Handle the pause function
    const pauseHandler = () => {
    if (iconName === 'pause') {
      setIconName('play');
      setRunning(false);
    } else {
      setIconName('pause');
      setRunning(true);
        }
    }


    // Subscirbe the Pedometer and update it 
    const subscribe = () => {
        //const isPermissionsAvailable = await Pedometer.getPermissionsAsync();
        //const isAvailable = await Pedometer.isAvailableAsync();
        //setIsPedometerAvailable(String(isAvailable));
        const subscription = Pedometer.watchStepCount((result) => {
           updateStepCount(result.steps);
            })
        //}
    }
    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailable(String(result))
      },
      (error) => {
        setPedometerAvailable(String(error))
      }
    )
    
    // Update the step count data to the firebase
    async function writeWalkingRecord() {
      if (user && user.uid){
        const walkingData = {
            step_count: stepCount,
            start_date: Timestamp.fromDate(new Date()),
            uid: user.uid,  
        }
    const newDoc = await addDoc(collection(db, "exercise_walking"), walkingData);
    console.log("Document written with ID: ", newDoc.id);
      }
    }


    // const _unsubscribe = () => {
    // subscription && subscription.remove();
    // setSubscription(null);
    // };

    useEffect(() => {
      subscribe();
    },[]);


    return (
    <View className="flex flex-1 items-center w-screen h-screen ">  
      <View className="bg-amber-400 h-3/4 w-full flex items-center justify-between ">
        <Text className='mt-20 text-2xl font-bold text-white'>WALKING</Text>
        <Image source={walkingImage} 
          style={{ width: 300, height: 300 }}
        />
        <Text className='mb-20 text-4xl font-bold text-white'>{stepCount}</Text>
      </View>
      <View className='flex-row w-full justify-around relative bottom-12'>

        <Button
          icon={{
            name: 'close',
            type: 'font-awesome',
            color: '#FF7457',
            size: 32
          }}
          buttonStyle={{
            backgroundColor: 'white',
            height: 80,
            width: 80,
            borderColor: '#FF7457',
            borderWidth: 5,
            marginTop:'10%'
          }}
          radius={40}
          onPress={() => {
            setVisible(true);
            setRunning(false);
          }}
        />

        <Button
          icon={{
            name: iconName,
            type: 'font-awesome',
            color: '#FF7457',
            size: 40
          }}
          buttonStyle={{
            backgroundColor: 'white',
            height: 100,
            width: 100,
            borderColor: '#FF7457',
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
          <Dialog.Button title="Yes" onPress={() => {
            navigation.navigate(ROUTES.HOME_MAIN)
            writeWalkingRecord();
            updateStepCount(0);
            }
        }/>
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