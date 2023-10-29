import React,{ useState } from 'react';
import { Text, View, ScrollView, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { Button } from '@rneui/themed';
import useAuth from '../../hook/useAuth';
import { User } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../config/firebase'; 



const badge = require('../../assets/images/badge.png');

const minus = require('../../assets/icons/minus-icon.png');

const plus = require('../../assets/icons/plus-icon.png');

const MyGoals = () => {
  const { user } = useAuth();
  const [walking, setWalking] = useState<number>();
  const [pushUp, setPushUp] = useState<number>();
  const [sitUp, setSitUp] = useState<number>();

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

  const updateUserData = () => {
    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      updateDoc(userDocRef, { 'goals.walking': walking, 'goals.push_up':pushUp, 'goals.sit_up':sitUp }).catch(error => {
        console.error('Error updating user data:', error);
      });
    }
  };

  const handleGoalChange = (setter: { (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (arg0: (prev: any) => number): void; }, increment: number) => {
    setter(prev => Math.max(prev + increment, 0));
  };

  const handleSubmit = () => {
    updateUserData();
  };



  return (
    <View className="flex ">
      <View className="flex flex-row">
        <View className="basis-8/12">
          <Text className="text-3xl mt-20 ml-6 font-black">Set Up Goals!</Text>
        </View>
        <View className="basis-4/12 mt-16 ml-6 ">
          <Image source={badge} style={{ width: 90, height: 90 }} />
        </View>
      </View>
      <View className="items-center mt-12">
        <View style={styles.container}>
          <GoalSection title="Walking" currentValue={walking} onMinus={() => handleGoalChange(setWalking, -1)} onPlus={() => handleGoalChange(setWalking, 1)} />
          <GoalSection title="Push-up" currentValue={pushUp} onMinus={() => handleGoalChange(setPushUp, -1)} onPlus={() => handleGoalChange(setPushUp, 1)} />
          <GoalSection title="Sit-up" currentValue={sitUp} onMinus={() => handleGoalChange(setSitUp, -1)} onPlus={() => handleGoalChange(setSitUp, 1)} />
        </View>
      </View>
      <View className="justify-center items-center mt-12">

      <Button  
            radius={"sm"} 
            type="solid" 
            buttonStyle={styles.buttonStyle}
            onPress={handleSubmit} // TODO: handle submit
        >
            <Text className="mr-8 text-2xl text-white font-bold ">Confirm</Text> 
            <Icon name="save" color="white" />
        </Button>

    </View>
    </View>
  );
};

type GoalSectionProps = {
  title: string;
  currentValue: number;
  onMinus: () => void;
  onPlus: () => void;
};

const GoalSection = ({ title, currentValue, onMinus, onPlus }: GoalSectionProps) => (
  <View className="flex flex-row ml-4 mt-10 mr-3 justify-between items-center">
    <Text className="text-3xl justify-center items-center font-bold">{title}</Text>
    <TouchableOpacity onPress={onMinus}>
      <Image source={minus} style={{ width: 20, height: 20, marginLeft: 35, marginTop: 8 }} />
    </TouchableOpacity>
    <Text className="text-2xl ml-4 mr-4 mt-1 font-semibold">{currentValue}</Text>
    <TouchableOpacity onPress={onPlus}>
      <Image source={plus} style={{ width: 20, height: 20, marginTop: 8 }} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 300,
    height: 330,
    borderRadius: 10,
    // Other styles for your container
    // Shadow properties
    shadowColor: '#000000',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    // Elevation (for Android)
    elevation: 5,
  },
  touchableOpacityStyle: {
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    width: 280,
    height: 50,
    backgroundColor: "#4B6EF5",
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,  
      height: 4,  
    },
    shadowOpacity: 0.25,   
    shadowRadius: 3,    
    elevation: 4,          
  },
  
});

export default MyGoals