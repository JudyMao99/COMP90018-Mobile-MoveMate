import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const LoadingOverlay = () => {
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    </>
  )
}

export default LoadingOverlay