import React,{ useState, useEffect } from 'react';
import { Text, View,Image, TouchableOpacity } from 'react-native';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
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
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        setIsLoading(false);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setWalking(userData.goals.walking ? userData.goals.walking : 1000);
          setPushUp(userData.goals.push_up ? userData.goals.push_up : 50);
          setSitUp(userData.goals.sit_up ? userData.goals.sit_up : 50);

          const lastUpdated = userData.lastUpdated ? userData.lastUpdated.toDate() : new Date(0);
          const now = new Date();
          const timeDiff = now.getTime() - lastUpdated.getTime();
          
          // If last update was less than 10 seconds ago, disable the button  24 * 60 * 60 * 1000
          if (timeDiff < 10000) {
            setIsButtonDisabled(true);
            console.log("Button disabled, will enable in:", 10000 - timeDiff, "ms");

            // Enable the button after 10 seconds
            setTimeout(() => {
              setIsButtonDisabled(false);
              console.log("Button enabled");
            }, 10000 - timeDiff);
          }

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

  const handleGoalsSubmit = async () => {
    const goalsObj = {
      walking: walking,
      push_up: pushUp,
      sit_up: sitUp
    };
  
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        const docSnap = await getDoc(userDocRef);
  
        if (docSnap.exists()) {
          // update if exists
          const userData = docSnap.data();
          const lastUpdated = userData.lastUpdated || Timestamp.fromDate(new Date(0)); // Default to a very old date as a Timestamp
          console.log("Last updated:", lastUpdated.toDate());
          const now = Timestamp.fromDate(new Date()); 
          
          // Check if last update was more than 24 hours ago  24 * 60 * 60 * 1000
          if (now.toMillis() - lastUpdated.toMillis() > 10000) {
            // More than 24 hours ago, add to goal_history and update current goals
            await addDoc(collection(db, "goal_history"), {
              date: now,
              goals: goalsObj,
              uid: user.uid
            });
          }
          // Update current goals
          await setDoc(userDocRef, {
            goals: goalsObj,
            lastUpdated: now
          });
          setIsButtonDisabled(true);
          console.log("Goals updated!");
        } else {
          // User doc doesn't exist, set default values
          const now = Timestamp.fromDate(new Date()); 
          await setDoc(userDocRef, {
            goals: goalsObj,
            lastUpdated: Timestamp.fromDate(new Date())
          });
          setIsButtonDisabled(true);
          console.log("users Goals created!");
          
          await addDoc(collection(db, "goal_history"), {
            date: now,
            goals: goalsObj,
            uid: user.uid
          });

        }
      } catch (e) {
        console.log("Got error:", e);
      }
    }
  
    if (nextStep) {
      nextStep();
    }
  };

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
        <TouchableOpacity className="py-2 bg-blue-brand rounded-full w-64 h-12" onPress={handleGoalsSubmit} disabled={isButtonDisabled}>
          <Text className="text-xl font-bold text-center text-white">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
      }
    </>
  );
};

export default MyGoals

