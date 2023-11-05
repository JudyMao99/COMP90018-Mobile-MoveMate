import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

type IconButtonProps = {
  handleOnPress: () => void;
  icon: string;
  title?: string;
}
const IconButton = ({
  handleOnPress,
  icon,
  title
}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={handleOnPress}
      className="h-10 flex-row items-center justify-center">
        {/* 
        // @ts-ignore*/}
      <Entypo name={icon} size={28} color='#f1f1f1' />
      <Text className="font-bold text-gray-200 ml-3">{title}</Text>
    </TouchableOpacity>
  )
}

export default IconButton