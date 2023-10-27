import React,{ useState } from 'react';
import { Text, View, ScrollView, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { Button } from '@rneui/themed';



const badge = require('../../assets/images/badge.png');

const minus = require('../../assets/icons/minus-icon.png');

const plus = require('../../assets/icons/plus-icon.png');

const MyGoals = () => {

  const navigation = useNavigation();

  const [walking, setWalking] = useState(1000);
  const [pushUp, setPushUp] = useState(50);
  const [sitUp, setSitUp] = useState(50);

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
          <View className="flex flex-row ml-4 mt-10 mr-3 justify-between items-center">
              <Text  className="text-3xl justify-center items-center">Walking</Text>
              <TouchableOpacity onPress={handleWalkingMinus}>
                <Image source={minus} style={{ width: 20, height: 20, marginLeft: 43,marginTop:8 }} />
              </TouchableOpacity>
              <Text className="text-2xl ml-4 mr-4 mt-1 ">{walking}</Text>
              <TouchableOpacity onPress={handleWalkingPlus}>
                <Image source={plus} style={{ width: 20, height: 20 ,marginTop:8 }} />
              </TouchableOpacity>
          </View>
          <View className="flex flex-row ml-4 mt-12 mr-3  justify-between items-center">
            <Text  className="text-3xl justify-center items-center">Push-up</Text>
            <TouchableOpacity  onPress={handlePushUpMinus}>
              <Image source={minus} style={{ width: 20, height: 20, marginLeft: 35,marginTop:8 }} />
            </TouchableOpacity>
            <Text className="text-2xl ml-4 mr-4 mt-1">{pushUp}</Text>
            <TouchableOpacity  onPress={handlePushUpPlus}>
              <Image source={plus} style={{ width: 20, height: 20 ,marginTop:8 }} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row ml-4 mt-10 mb-1 mr-3 justify-between items-center">
            <Text className="text-3xl justify-center items-center">Sit-up</Text>
            <TouchableOpacity  onPress={handleSitUpMinus}>
              <Image source={minus} style={{ width: 20, height: 20, marginLeft: 66,marginTop:8 }} />
            </TouchableOpacity>
            <Text className="text-2xl ml-4 mr-4 mt-1">{sitUp}</Text>
            <TouchableOpacity  onPress={handleSitUpPlus}>
              <Image source={plus} style={{ width: 20, height: 20 ,marginTop:8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="justify-center items-center mt-12">
      <Button  
            radius={"sm"} 
            type="solid" 
            buttonStyle={styles.buttonStyle}
            // onPress={() => navigation.navigate(ROUTES.PROFILE)}
        >
            <Text className="mr-8 text-2xl text-white font-bold ">Confirme</Text> 
            <Icon name="save" color="white" />
        </Button>
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