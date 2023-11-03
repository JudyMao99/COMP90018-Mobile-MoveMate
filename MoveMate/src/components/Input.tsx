import { Text, TextInput, View } from 'react-native'
import React from 'react'

type InputProps = {
  title: string;
  value: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText: (val?: any) => void;
}
const Input = ({
  title,
  value,
  placeholder,
  secureTextEntry,
  onChangeText
} : InputProps) => {
  return (
    <>
      <Text className="text-gray-700 ml-4 mb-2">{title}</Text>
      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry ?? false}
      />
    </>
  )
}

export default Input