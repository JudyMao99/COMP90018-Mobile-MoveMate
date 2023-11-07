import { View, Text } from 'react-native'
import React from 'react';
import CountDown from 'react-native-countdown-fixed';
import { FAB, Button, Dialog} from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import useAuth from '../../hook/useAuth';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc,Timestamp} from "firebase/firestore";


const WorkingMode = ({route} : any) => {
  const {duration} = route.params;
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [iconName, setIconName] = React.useState('pause');
  const [running, setRunning] = React.useState(true);
  const { user } = useAuth();

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

  // Update the step count data to the firebase
  async function writeFocusRecord() {
    if (user && user.uid){
      const focusData = {
          duration: duration*60,
          start_date: Timestamp.fromDate(new Date()),
          uid: user.uid,  
      }
  const newDoc = await addDoc(collection(db, "focus"), focusData);
    }
  }
  
  return (
    <View className="flex flex-1 items-center w-screen h-screen ">
      <View className="bg-sky-500 h-3/4 w-full flex items-center justify-around ">
        <CountDown
          until={duration*60}
          size={60}
          timeToShow={['M', 'S']}
          timeLabels={{m: null, s: null}}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: '#0ea5e9'}}
          showSeparator
          onFinish={() => {
            navigation.navigate(ROUTES.WORKING_FINISH)
            writeFocusRecord();
          }}
          running = {running}
        />
      </View>
      <View className='flex-row w-full justify-around relative bottom-12'>
      <Button
          icon={{
            name: 'close',
            type: 'font-awesome',
            color: '#0ea5e9',
            size: 32
          }}
          buttonStyle={{
            backgroundColor: 'white',
            height: 80,
            width: 80,
            borderColor: '#0ea5e9',
            borderWidth: 5,
            marginTop:'10%'
          }}
          radius={40}
          onPress={() => {
            setVisible(true);
            setRunning(false);
          }}
        />
        <Button
          icon={{
            name: iconName,
            type: 'font-awesome',
            color: '#0ea5e9',
            size: 40
          }}
          buttonStyle={{
            backgroundColor: 'white',
            height: 100,
            width: 100,
            borderColor: '#0ea5e9',
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
        <Text>Sure to terminate the working mode?</Text>
        <Dialog.Actions>
          <Dialog.Button 
          title="Yes" 
          onPress={() => {
            navigation.navigate(ROUTES.WORKING_FINISH)
            setVisible(false)
            }}/>
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

export default WorkingMode