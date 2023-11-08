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
  const [cyclingDuration, setCyclingDuration] = React.useState(0);
  const [cyclingDistance, setCyclingDistance] = React.useState(0);
  const [walkingGoal, setWalkingGoal] = React.useState(0);
  const [cyclingDurationGoal, setCyclingDurationGoal] = React.useState(0);
  const [cyclingDistanceGoal, setCyclingDistanceGoal] = React.useState(0);
  // const [, forceUpdate] = React.useReducer(x => x + 1, 0);



  React.useEffect(() => {

    queryFocus();
    queryStep();
    queryCycling();
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
        if(doc.data().start_date.toDate().toDateString() === new Date().toDateString()) {
          tmpStep += doc.data().step_count;
        }
      });
      setStepCount(tmpStep);
    }
    
  }

  async function queryCycling() {
    let tmpCyclingDuration = 0;
    let tmpCyclingDistance = 0;
    if (user && user.uid) {

      const q = query(collection(db, "exercise_cycling"), where("uid", "==", user.uid));

      const querySnapshot =  await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(doc.data().start_date.toDate().toDateString() === new Date().toDateString()) {
          tmpCyclingDuration += doc.data().duration;
          tmpCyclingDistance += doc.data().distance;
        }
      });
      setCyclingDistance(parseFloat(tmpCyclingDistance.toFixed(2)));
      setCyclingDuration(Math.floor(tmpCyclingDuration / 60));
    }
    
  }



  async function queryGoal() {
    let tmpCyclingDurationGoal = 0;
    let tmpCyclingDistanceGoal = 0;
    let tmpWalkingGoal = 0;
    if (user && user.uid) {
      const userDocRef = doc(db, 'users', user.uid);
      await getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          tmpCyclingDurationGoal = userData.goals.duration / 60 ;
          tmpCyclingDistanceGoal = userData.goals.distance ;
          tmpWalkingGoal = userData.goals.walking;
        } else {
          // TODO: handle user not found
          tmpCyclingDurationGoal = 50;
          tmpCyclingDistanceGoal = 5;
          tmpWalkingGoal = 1000;
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
       
      });
    }
    setWalkingGoal(tmpWalkingGoal);
    setCyclingDurationGoal(tmpCyclingDurationGoal);
    setCyclingDistanceGoal(tmpCyclingDistanceGoal);
    
  }

  async function queryFocus() {
    let tmpDuration = 0;
    if (user && user.uid) {

      const q = query(collection(db, "focus"), where("uid", "==", user.uid));

      const querySnapshot =  await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(doc.data().start_date.toDate().toDateString() === new Date().toDateString()) {
          tmpDuration += doc.data().duration;
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
          <Card.Title>Walking Step</Card.Title>
          <Card.Divider/>
          <View className="flex justify-center items-center">
            <Text>{stepCount}/{walkingGoal}</Text>
          </View>
          
        </Card>
        <Card containerStyle={{width: '25%', borderColor: 'transparent'}}>
          <Card.Title>Cycling Distance</Card.Title>
          <Card.Divider/>
          <View className="flex justify-center items-center">
            <Text>{cyclingDistance}/{cyclingDistanceGoal}</Text>
          </View>
          
        </Card>
        <Card containerStyle={{width: '25%', borderColor: 'transparent'}}>
          <Card.Title>Cycling Duration</Card.Title>
          <Card.Divider/>
          <View className="flex justify-center items-center">
            <Text>{cyclingDuration}/{cyclingDurationGoal}</Text>
          </View>
          
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