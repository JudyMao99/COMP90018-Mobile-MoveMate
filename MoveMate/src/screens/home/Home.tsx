import { View, Text, StyleSheet } from 'react-native'
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { FAB, ButtonGroup, Chip, CheckBox, Card } from '@rneui/themed';
import { Button } from 'react-native-paper';
import useAuth from '../../hook/useAuth';
import { getDoc, doc, setDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from '../../config/firebase';



const buttonValues = [15,30,60]
const Home = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedDuration, setSelectedDuration] = React.useState(15);
  const { user } = useAuth();
  const [stepCount, setStepCount] = React.useState(0);
  const [focusDuration, setFocusDuration] = React.useState(0);
  const [walkingGoal, setWalkingGoal] = React.useState(0);
  const [pushupGoal, setPushupGoal] = React.useState(0);
  const [situpGoal, setSitupGoal] = React.useState(0);
  // const [, forceUpdate] = React.useReducer(x => x + 1, 0);



  React.useEffect(() => {

    queryFocus();
    queryStep();
    queryGoal();
    
  });

  React.useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      queryFocus();
      queryStep();
      queryGoal();
    });

    return unsubscribe;
    
  },[navigation]);

  

  async function queryStep() {
    let tmpStep = 0;
    if (user && user.uid) {

      const q = query(collection(db, "exercise_walking"), where("uid", "==", user.uid));

      const querySnapshot =  await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(new Date().toDateString());
        if(doc.data().start_date.toDate().toDateString() === new Date().toDateString()) {
          tmpStep += doc.data().step_count;
          // setStepCount(stepCount + doc.data().step_count);
          // console.log(doc.id, " => ", doc.data().start_date.toDate().toDateString());
        }
      });
      setStepCount(tmpStep);
    }
    
  }

  async function queryGoal() {
    let tmpWalkingGoal = 0;
    let tmpPushupGoal = 0;
    let tmpSitupGoal = 0;
    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      await getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          tmpWalkingGoal = userData.goals.walking ;
          tmpPushupGoal = userData.goals.push_up ;
          tmpSitupGoal = userData.goals.sit_up;
          console.log(tmpWalkingGoal, tmpPushupGoal, tmpSitupGoal);
          // setWalkingGoal(userData.goals.walking !== undefined ? userData.goals.walking : 1000);
          // setPushupGoal(userData.goals.push_up !== undefined ? userData.goals.push_up : 50);
          // setSitupGoal(userData.goals.sit_up !== undefined ? userData.goals.sit_up : 50);
        } else {
          // TODO: handle user not found
          tmpWalkingGoal = 1000;
          tmpPushupGoal = 50;
          tmpSitupGoal = 50;
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
       
      });
    }
    setWalkingGoal(tmpWalkingGoal);
    setPushupGoal(tmpPushupGoal);
    setSitupGoal(tmpSitupGoal);
    
  }

  async function queryFocus() {
    let tmpDuration = 0;
    if (user && user.uid) {

      const q = query(collection(db, "focus"), where("uid", "==", user.uid));

      const querySnapshot =  await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(new Date().toDateString());
        if(doc.data().start_date.toDate().toDateString() === new Date().toDateString()) {
          tmpDuration += doc.data().duration;
          // setFocusDuration(focusDuration + doc.data().duration);
          // console.log(doc.id, " => ", doc.data().start_date.toDate().toDateString());
        }
      });
      setFocusDuration(tmpDuration);
    }
    
  }



  
  
  return (
    <View className="flex flex-1 items-center w-screen h-screen ">
      
      <View className="bg-white h-3/5 w-full rounded-2xl flex-col items-center justify-center ">
        <View className='flex-col items-start w-4/5 gap-y-4 mb-10'>
          <Text style={styles.title}>Hello,{user?.displayName??undefined}</Text>
          <Text style={styles.working_hour}>{Math.floor(focusDuration / 3600)} Hours {Math.floor(focusDuration % 3600 / 60)} Min</Text>
        </View>
        
        <ButtonGroup
          buttons={['15 min', '30 min', '60 min']}
          buttonStyle={{
            borderRadius: 20,
            backgroundColor: '#C2C2C2',
          }}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
            setSelectedDuration(buttonValues[value]);
          }}
          containerStyle={{
            borderWidth:0,
            gap:5,
          }}
          textStyle={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white'
          }}
          innerBorderStyle={{
            width: 0
          }}
      />
      </View>
      <FAB
        title="Start"
        color='#2089dc'
        upperCase
        radius={'lg'}
        onPress={() => {
          navigation.navigate(ROUTES.WORKING_MODE,{duration: selectedDuration});
        }}
        style={{position:'relative', bottom: 25}}
      />
      <View className='w-full flex flex-row flex-even items-center justify-center'>
        <Card containerStyle={{width: '25%', borderColor: 'transparent'}}>
          <Card.Title>walking</Card.Title>
          <Card.Divider/>
          <Text>{stepCount}/{walkingGoal}</Text>
        </Card>
        <Card containerStyle={{width: '25%', borderColor: 'transparent'}}>
          <Card.Title>PushUp</Card.Title>
          <Card.Divider/>
          <Text>50/{pushupGoal}</Text>
        </Card>
        <Card containerStyle={{width: '25%', borderColor: 'transparent'}}>
          <Card.Title>SitUp</Card.Title>
          <Card.Divider/>
          <Text>50/{situpGoal}</Text>
        </Card>
      </View>
      {/* <Button 
        onPress = {() => navigation.navigate(ROUTES.WORKING_FINISH)}>finish</Button> */}
      {/* <Button 
        onPress={forceUpdate}>refresh</Button> */}
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#2089dc'
  },
  working_hour: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#2089dc'
  }
  })