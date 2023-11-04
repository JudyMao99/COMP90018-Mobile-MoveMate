import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const UploadImage = () => {
  const [image, setImage] = useState<string>();
  const addImage = () => {}

  return (
    <View>
      {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <View>
              <TouchableOpacity onPress={addImage}>
                  <Text>{image ? 'Edit' : 'Upload'} Image</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}

export default UploadImage