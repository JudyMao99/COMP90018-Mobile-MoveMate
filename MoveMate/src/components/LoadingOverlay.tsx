import React from 'react'
import { View, ActivityIndicator } from 'react-native'

type LoadingOverlayType = {
  isVisible: boolean
}
const LoadingOverlay = ({
  isVisible
} : LoadingOverlayType ) => {
  return (
    <>
      {isVisible &&
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      }
    </>
  )
}

export default LoadingOverlay