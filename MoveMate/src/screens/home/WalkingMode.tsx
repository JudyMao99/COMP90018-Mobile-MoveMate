import 'react-native-gesture-handler';
import { Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import React from 'react';
import { FAB, Button, Dialog, Icon} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc,Timestamp} from "firebase/firestore";
import useAuth from '../../hook/useAuth';

const WalkingMode = ({route}: any) => {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [isPermissionsAvailable, setIsPermissionsAvailable] = useState('Checking')
    //const [permissionRequst, setPermissionRequsts] = useState('')
    const [stepCount, updateStepCount] = useState(0);
    //const [subscription, setSubscription] = useState(null);
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const [iconName, setIconName] = React.useState('pause');
    const [running, setRunning] = React.useState(true);
    const [pastStepCount, setPastStepCount] = useState(0);

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
    const subscribe = async () => {
        const isPermissionsAvailable = await Pedometer.getPermissionsAsync();
        setIsPermissionsAvailable(String(isPermissionsAvailable));
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));
        if (isAvailable) {
            // const end = new Date();
            // const start = new Date();
            // console.log(end)
            // console.log(start)
            // start.setDate(end.getDate()-1)
            // const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
            // if (pastStepCountResult) {
            //     setPastStepCount(pastStepCountResult.steps);
            //     console.log("PAST step count: " + pastStepCount)
            // }
        Pedometer.watchStepCount((result) => {
           updateStepCount(result.steps);
            })
        }
    }

    
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
        const subscription = subscribe();
        return () => subscription && subscription.remove();
    },[]);

    // TODO: Write the step count down into the view
    return (
    <View className="flex flex-1 items-center w-screen h-screen ">  
      <View className="bg-amber-400 h-3/4 w-full flex items-center justify-around ">
        <Text fontSize="24">WALKING</Text>
        <Text fontSize="30">steps: {stepCount - pastStepCount}</Text>
      </View>
      <View className='flex-row w-full justify-around relative bottom-12'>

      <Button
          icon={{
            name: 'close',
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
            setPastStepCount(0);
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
  
