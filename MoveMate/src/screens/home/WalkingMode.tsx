import 'react-native-gesture-handler';
import { Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import React from 'react';
import { FAB, Button, Dialog, Icon} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, setDoc,Timestamp} from "firebase/firestore";
import moment from "moment";

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
    const [currentTimeStamp, setCurrentTimeStamp] = useState('')
    //const lastStep = 5

    // Handle the pause function
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
    // TODO: 问题： 当前stepcounter应该只能在每一次应用程序重启后，才能做到重头开始计算step count，要不然就会继续记录上一次step count的数据
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

    
    // Update the step count data to the firebase
    async function writeWalkingRecord() {
        
        const walkingData = {
            count: stepCount,
            duration: 10,
            exercise_id: 2,
            exercise_type: "Walking",
            start_date: Timestamp.fromDate(new Date()),
            uid: ""  
        }

    const newDoc = await addDoc(collection(db, "exercise"), walkingData);
    console.log("Document written with ID: ", newDoc.id);

    }


    // const _unsubscribe = () => {
    // subscription && subscription.remove();
    // setSubscription(null);
    // };


    useEffect(() => {
    subscribe();
    },[]);

    // TODO: Write the step count down into the view
    return (
    <View className="flex flex-1 items-center w-screen h-screen ">  
      <View className="bg-amber-400 h-3/4 w-full flex items-center justify-around ">
        <Text fontSize="24">WALKING</Text>
        <Text fontSize="30">steps: {stepCount}</Text>
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
            navigation.navigate(ROUTES.HOME)
            writeWalkingRecord();
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
  
