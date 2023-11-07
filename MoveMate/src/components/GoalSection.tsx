import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';

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
    <View className="flex flex-row items-center justify-between">
      <Text className="text-xl justify-center items-center font-bold">
        {title}
      </Text>
      <View className="flex flex-row items-center justify-between w-24">
        <TouchableOpacity onPress={onMinus}>
          <Icon name='minussquareo' type='ant-design' size={20} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">{currentValue}</Text>
        <TouchableOpacity onPress={onPlus}>
          <Icon name='plussquareo' type='ant-design' size={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GoalSection