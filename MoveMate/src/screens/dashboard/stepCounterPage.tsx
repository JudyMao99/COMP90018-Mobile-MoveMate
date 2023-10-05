import useHealthData from '../../hook/useHealthData';
import { View, Text } from 'react-native'
import React from 'react'



// const {steps, distance, flights} = useHealthData();
// console.log(`Steps: ${steps} | Distance: ${distance}m | Flights: ${flights}`);

const StepCounterPage = () => {

    return (
    <View>
      <Text>stepCounterPage</Text>
      {/* <Text>{steps.toString()}</Text>
      <Text>{distance}</Text>
      <Text>{flights.toString()}</Text>   */}
    </View>
  )
}


export default StepCounterPage;
    
