import { View, Text, StyleSheet } from 'react-native'
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import { FAB, ButtonGroup, Chip, CheckBox, Card } from '@rneui/themed';
import { Button } from 'react-native-paper';
import useAuth from '../../hook/useAuth';



const buttonValues = [15,30,60]
const Home = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedDuration, setSelectedDuration] = React.useState(15);
  const { user } = useAuth();
  
  return (
    <View className="flex flex-1 items-center w-screen h-screen ">
      
      <View className="bg-white h-3/5 w-full rounded-2xl flex-col items-center justify-center ">
        <View className='flex-col items-start w-4/5 gap-y-4 mb-10'>
          <Text style={styles.title}>Hello,{user?.displayName??undefined}</Text>
          <Text style={styles.working_hour}>4 Hours 0 Min</Text>
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
          <Text>50/5000</Text>
        </Card>
        <Card containerStyle={{width: '25%', borderColor: 'transparent'}}>
          <Card.Title>PushUp</Card.Title>
          <Card.Divider/>
          <Text>50/5000</Text>
        </Card>
        <Card containerStyle={{width: '25%', borderColor: 'transparent'}}>
          <Card.Title>SitUp</Card.Title>
          <Card.Divider/>
          <Text>50/5000</Text>
        </Card>
      </View>
      <Button 
        onPress = {() => navigation.navigate(ROUTES.WORKING_FINISH)}>finish</Button>
    </View>
  )
}

export default Home

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