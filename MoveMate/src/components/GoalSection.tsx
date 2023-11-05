import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'


const minus = require('../assets/icons/minus-icon.png');
const plus = require('../assets/icons/plus-icon.png');

type GoalSectionProps = {
  title: string;
  currentValue?: number;
  onMinus: () => void;
  onPlus: () => void;
};

const GoalSection = ({ 
  title,
  currentValue,
  onMinus,
  onPlus 
  } : GoalSectionProps) => {
  return (
    <>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-3xl justify-center items-center font-bold">
          {title}
        </Text>
        <View className="flex flex-row items-center justify-between w-28">
          <TouchableOpacity onPress={onMinus}>
            <Image source={minus} style={{ width: 20, height: 20}} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold">{currentValue}</Text>
          <TouchableOpacity onPress={onPlus}>
            <Image source={plus} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default GoalSection