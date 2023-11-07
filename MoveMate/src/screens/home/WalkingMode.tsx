import 'react-native-gesture-handler';
import { Text, View, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import React from 'react';
import { FAB, Button, Dialog, Icon} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc,Timestamp,query,where, getDocs} from "firebase/firestore";
import useAuth from '../../hook/useAuth';


const walkingImage = require('../../assets/images/walking.png')
const WalkingMode = ({route}: any) => {
    const [isPedometerAvailable, setPedometerAvailable] = useState('checking');
    const [stepCount, updateStepCount] = useState(0);
    const [walkingGoal, setWalkingGoal] = useState(0);
    const [pastWalkingData, setPastWalkingData] = useState(0);
    //const [subscription, setSubscription] = useState(null);
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const [iconName, setIconName] = React.useState('pause');
    const [running, setRunning] = React.useState(true);
    const [goalAchieveVisible, setGoalAchieveVisible] = useState(false);
    const [isReachGoal, setIsReachGoal] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
      if (pastWalkingData < walkingGoal && isReachGoal == false) {
        if (stepCount + pastWalkingData >= walkingGoal && walkingGoal > 0) {
          setGoalAchieveVisible(true); // 显示目标完成弹窗
          setIsReachGoal(true)
        }
      }
    }, [stepCount]);

    useEffect(() => {
      queryGoal();
      queryStep();
      subscribe();
    });
    
    // Query the current goal of walk
    async function queryGoal() {
    let tmpWalkingGoal = 0;
    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      await getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          tmpWalkingGoal = userData.goals.walking ;
        } else {
          tmpWalkingGoal = 1000;
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
    setWalkingGoal(tmpWalkingGoal);
  }

    // Query the past step of today
    async function queryStep() {
    let tmpStep = 0;
    if (user && user.uid) {

      const q = query(collection(db, "exercise_walking"), where("uid", "==", user.uid));

      const querySnapshot =  await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(doc.data().start_date.toDate().toDateString() === new Date().toDateString()) {
          tmpStep += doc.data().step_count;
        }
      });
      setPastWalkingData(tmpStep);
    }
    
  }


    // Subscirbe the Pedometer and update it 
    const subscribe = () => {
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
      }
    }



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
      <Dialog
        isVisible={goalAchieveVisible}
        onBackdropPress={() => setGoalAchieveVisible(false)}
      >
        <Dialog.Title title="Congratulations!" />
        <Text>You have achieved your walking goal for today!</Text>
        <Dialog.Actions>
          <Dialog.Button title="Great!" onPress={() => setGoalAchieveVisible(false)} />
        </Dialog.Actions>        
      </Dialog>
    </View>
  )
}

export default WalkingMode