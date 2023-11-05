import React,{ useState } from 'react';
import { Text, View,Image, TouchableOpacity } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useAuth from '../../hook/useAuth';
import { getDoc } from "firebase/firestore";
import GoalSection from '../../components/GoalSection';
import LoadingOverlay from '../../components/LoadingOverlay';

const goal = require('../../assets/icons/goal.png');

type MyGoalsProps = {
  nextStep?: () => void;
}
const MyGoals = ({ nextStep }: MyGoalsProps) => {
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [walking, setWalking] = useState<number>();
  const [pushUp, setPushUp] = useState<number>();
  const [sitUp, setSitUp] = useState<number>();

  React.useEffect(() => {
    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        setIsLoading(false);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setWalking(userData.goals.walking ? userData.goals.walking : 1000);
          setPushUp(userData.goals.push_up ? userData.goals.push_up : 50);
          setSitUp(userData.goals.sit_up ? userData.goals.sit_up : 50);
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
    <>
    {isLoading ? 
      <LoadingOverlay />
      :
      <View className="flex-1 flex-col items-center m-4 justify-between pb-8">
        <View className="flex flex-row items-center justify-center gap-x-6">
          <Text className="text-3xl font-black">Set Up Goals!</Text>
          <Image source={goal} style={{ width: 90, height: 90 }} />
        </View>
        <View className="w-80 h-80 bg-white border-0.5 rounded-lg flex flex-col py-8 px-6 justify-between">
          <GoalSection title="Walking" currentValue={walking} onMinus={() => walking && setWalking(walking - 1)} onPlus={() => walking && setWalking(walking + 1)} />
          <GoalSection title="Push-up" currentValue={pushUp} onMinus={() => pushUp && setPushUp(pushUp - 1)} onPlus={() => pushUp && setPushUp(pushUp + 1)} />
          <GoalSection title="Sit-up" currentValue={sitUp} onMinus={() => sitUp && setSitUp(sitUp - 1)} onPlus={() => sitUp && setSitUp(sitUp + 1)} />
        </View>
        <TouchableOpacity className="py-2 bg-brand rounded-full w-64 h-12" onPress={handleGoalsSubmit}>
          <Text className="text-2xl font-bold text-center text-white">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
      }
    </>
  );
};

export default MyGoals