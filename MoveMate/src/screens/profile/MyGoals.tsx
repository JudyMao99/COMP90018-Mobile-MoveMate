import React,{ useState } from 'react';
import { Text, View, ScrollView, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { Button } from '@rneui/themed';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useAuth from '../../hook/useAuth';



const badge = require('../../assets/images/badge.png');

const minus = require('../../assets/icons/minus-icon.png');

const plus = require('../../assets/icons/plus-icon.png');

type MyGoalsProps = {
  handleSignUp?: () => {};
}
const MyGoals = ({ handleSignUp }: MyGoalsProps) => {

  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [walking, setWalking] = useState<number>(1000);
  const [pushUp, setPushUp] = useState<number>(50);
  const [sitUp, setSitUp] = useState<number>(50);

  const handleWalkingMinus = () => {
    if (walking > 0) {
      setWalking(walking - 1);
    }
  };

  const handleWalkingPlus = () => {
    setWalking(walking + 1);
  };

  const handlePushUpMinus = () => {
    if (pushUp > 0) {
      setPushUp(pushUp - 1);
    }
  };

  const handlePushUpPlus = () => {
    setPushUp(pushUp + 1);
  };

  const handleSitUpMinus = () => {
    if (sitUp > 0) {
      setSitUp(sitUp - 1);
    }
  };

  const handleSitUpPlus = () => {
    setSitUp(sitUp + 1);
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
        console.log("success!");
      }).catch((e) => {
        console.log("got error:" , e);
      })
    }
  }

  return (
    <View className="flex ">
      <View className="flex flex-row">
        <View className="basis-8/12">
          <Text className="text-4xl mt-10 ml-6 font-black">Set Up Goals!</Text>
        </View>
        <View className="basis-1/12 mt-8 ml-6 ">
          <Image source={badge} style={{ width: 85, height: 85 }} />
        </View>
      </View>
      <View className="items-center mt-6">
        <View style={styles.container}>
          <View className="flex flex-row ml-4 mt-12 justify-center items-center">
            <Text className="text-3xl justify-center items-center">Walking</Text>
            <TouchableOpacity onPress={handleWalkingMinus}>
              <Image source={minus} style={{ width: 20, height: 20, marginLeft: 20,marginTop:8 }} />
            </TouchableOpacity>
            <Text className="text-2xl ml-4 mr-4 mt-1 ">{walking}</Text>
            <TouchableOpacity onPress={handleWalkingPlus}>
              <Image source={plus} style={{ width: 20, height: 20 ,marginTop:8 }} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row ml-4 mt-12 justify-center items-center">
            <Text className="text-3xl justify-center items-center">Push-up</Text>
            <TouchableOpacity onPress={handlePushUpMinus}>
              <Image source={minus} style={{ width: 20, height: 20, marginLeft: 37,marginTop:8 }} />
            </TouchableOpacity>
            <Text className="text-2xl ml-4 mr-4 mt-1">{pushUp}</Text>
            <TouchableOpacity onPress={handlePushUpPlus}>
              <Image source={plus} style={{ width: 20, height: 20 ,marginTop:8 }} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row ml-4 mt-12 justify-center items-center">
            <Text className="text-3xl justify-center items-center">Sit-up</Text>
            <TouchableOpacity onPress={handleSitUpMinus}>
              <Image source={minus} style={{ width: 20, height: 20, marginLeft: 70,marginTop:8 }} />
            </TouchableOpacity>
            <Text className="text-2xl ml-4 mr-4 mt-1">{sitUp}</Text>
            <TouchableOpacity onPress={handleSitUpPlus}>
              <Image source={plus} style={{ width: 20, height: 20 ,marginTop:8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="justify-center items-center mt-4">
        <Button size="lg" radius="md" title="Confirm" onPress={() => handleGoalsSubmit()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 300,
    height: 330,
    borderRadius: 10,
    // Other styles for your container
    // Shadow properties
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    // Elevation (for Android)
    elevation: 5,
  },
});

export default MyGoals