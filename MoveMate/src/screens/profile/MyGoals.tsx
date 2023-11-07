import React,{ useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useAuth from '../../hook/useAuth';
import { getDoc } from "firebase/firestore";
import GoalSection from '../../components/GoalSection';
import LoadingOverlay from '../../components/LoadingOverlay';
import { Icon } from '@rneui/themed';

type MyGoalsProps = {
  nextStep?: () => void;
}
const MyGoals = ({ nextStep }: MyGoalsProps) => {
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [walking, setWalking] = useState<number>();
  const [distance, setDistance] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        setIsLoading(false);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setWalking(userData.goals.walking ? userData.goals.walking : 1000);
          setDistance(userData.goals.distance ? userData.goals.distance : 5);
          setDuration(userData.goals.duration ? Math.floor(userData.goals.duration / 60) : 10000 / 60);

          const lastUpdated = userData.lastUpdated ? userData.lastUpdated.toDate() : new Date(0);
          const now = new Date();
          const timeDiff = now.getTime() - lastUpdated.getTime();
          
          // If last update was less than 10 seconds ago, disable the button  24 * 60 * 60 * 1000
          if (timeDiff < 10000) {
            setIsButtonDisabled(true);

            // Enable the button after 10 seconds
            setTimeout(() => {
              setIsButtonDisabled(false);
              console.log("Button enabled");
            }, 10000 - timeDiff);
          }

        } else {
          // TODO: handle user not found
          setWalking(1000);
          setDistance(5); // Default value in km
          setDuration(50); // Default value converted to minutes
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
       
      });
    }
  }, [user]);

  const handleGoalsSubmit = async () => {
    const goalsObj = {
      walking: walking,
      distance: distance,
      duration: (duration ?? 50) * 60 // Convert to minutes
    };
  
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        const docSnap = await getDoc(userDocRef);
  
        if (docSnap.exists()) {
          // update if exists
          const userData = docSnap.data();
          const lastUpdated = userData.lastUpdated || Timestamp.fromDate(new Date(0)); // Default to a very old date as a Timestamp
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
        } else {
          // User doc doesn't exist, set default values
          const now = Timestamp.fromDate(new Date()); 
          await setDoc(userDocRef, {
            goals: goalsObj,
            lastUpdated: Timestamp.fromDate(new Date())
          });
          setIsButtonDisabled(true);
          
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
          <Icon name='medal' type='font-awesome-5' color='#2089DC' size={90} />
        </View>
        <View className="w-80 h-80 bg-white border-0.5 rounded-lg flex flex-col py-8 px-6 justify-between">
          <GoalSection title="Step (steps)" currentValue={walking} onMinus={() => walking && setWalking(walking - 1)} onPlus={() => walking && setWalking(walking + 1)} />
          <GoalSection title="Distance (km)" currentValue={distance} onMinus={() => distance && setDistance(distance - 1)} onPlus={() => distance && setDistance(distance + 1)} />
          <GoalSection title="Duration (mins)" currentValue={duration} onMinus={() => duration && setDuration(duration - 1)} onPlus={() => duration && setDuration(duration + 1)} />
        </View>
        <TouchableOpacity className="py-2 bg-blue-brand rounded-full w-64 h-12" onPress={handleGoalsSubmit} disabled={isButtonDisabled} style={{
            backgroundColor: isButtonDisabled ? '#cccccc' : '#2089DC'
          }}>
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
