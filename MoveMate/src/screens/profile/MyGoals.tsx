import React,{ useState } from 'react';
import { Text, View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@rneui/themed';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useAuth from '../../hook/useAuth';
import { getDoc } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
import GoalSection from '../../components/GoalSection';



const badge = require('../../assets/images/badge.png');


type MyGoalsProps = {
  nextStep?: () => void;
}
const MyGoals = ({ nextStep }: MyGoalsProps) => {

  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [walking, setWalking] = useState<number>(1000);
  const [pushUp, setPushUp] = useState<number>(50);
  const [sitUp, setSitUp] = useState<number>(50);

  React.useEffect(() => {
    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setWalking(userData.goals.walking !== undefined ? userData.goals.walking : 1000);
          setPushUp(userData.goals.push_up !== undefined ? userData.goals.push_up : 50);
          setSitUp(userData.goals.sit_up !== undefined ? userData.goals.sit_up : 50);
        } else {
          // TODO: handle user not found
          setWalking(1000);
          setPushUp(50);
          setSitUp(50);
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
       
      });
    }
  }, [user]);

  const handleGoalChange = (setter: { (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (arg0: (prev: any) => number): void; }, increment: number) => {
    setter(prev => Math.max(prev + increment, 0));
  };


  const handleGoalsSubmit = () => {
    const goalsObj = {
      walking: walking,
      push_up: pushUp,
      sit_up: sitUp
    }

    // Update goals to fire store database
    if (user) {
      setDoc(doc(db, 'users', user?.uid), {
        goals: goalsObj
      }).then(() => {
        console.log("goals updated!");
      }).catch((e) => {
        console.log("got error:" , e);
      })
    }

    // set up process only
    if (nextStep) {
      nextStep();
    }
  }

  return (
    <View className="flex-1 flex-col items-center m-4 justify-between pb-8">
      <View className="flex flex-row items-center justify-center gap-x-6">
        <Text className="text-3xl font-black">Set Up Goals!</Text>
        <Image source={badge} style={{ width: 90, height: 90 }} />
      </View>
      <View className="w-80 h-80 bg-white border-0.5 rounded-lg flex flex-col py-8 px-6 justify-between">
        <GoalSection title="Walking" currentValue={walking} onMinus={() => handleGoalChange(setWalking, -1)} onPlus={() => handleGoalChange(setWalking, 1)} />
        <GoalSection title="Push-up" currentValue={pushUp} onMinus={() => handleGoalChange(setPushUp, -1)} onPlus={() => handleGoalChange(setPushUp, 1)} />
        <GoalSection title="Sit-up" currentValue={sitUp} onMinus={() => handleGoalChange(setSitUp, -1)} onPlus={() => handleGoalChange(setSitUp, 1)} />
      </View>
      <TouchableOpacity className="py-2 bg-indigo-500 rounded-full w-64 h-12" onPress={handleGoalsSubmit}>
        <Text className="text-2xl font-bold text-center text-white">
          Confirm
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyGoals