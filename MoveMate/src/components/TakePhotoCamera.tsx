import { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from '@expo/vector-icons';

type TakePhotoCameraProps = {
 setImage: (uri: string) => void;
 setCameraVisible: (visible: boolean) => void;
}

export default function TakePhotoCamera({ setImage, setCameraVisible } : TakePhotoCameraProps) {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const cameraRef = useRef(null);

  const getCameraPermission = async () => {
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
  }

  useEffect(() => {
    getCameraPermission();
  }, [])
  

  const takePicture = async () => {
    if (cameraRef) {
      try {
        // @ts-ignore
        const data = await cameraRef.current?.takePictureAsync();
        console.log(data);
        setPhoto(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (photo) {
      try {
        const asset = await MediaLibrary.createAssetAsync(photo);
        setPhoto(null);
        // set image
        setImage(asset.uri);
        // set camera invisible
        setCameraVisible(false);
      } catch (error) {
        console.log(error);
      }
    }
  };


  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View className="flex-1 justify-center pt-14 bg-black">
    {!photo ? (
      <Camera
        className="flex-1"
        type={type}
        ref={cameraRef}
      >
        <View className="flex-row self-end px-6 py-2">
          <TouchableOpacity onPress={toggleCameraType}
            className="h-10 flex-row items-center justify-center">
            <Entypo name="retweet" size={28} color='#f1f1f1' />
          </TouchableOpacity>
        </View>
      </Camera>
      ) : (
        <Image source={{ uri: photo }} className="flex-1"/>
      )}

    <View className="pb-6 pt-2">
      {photo ? (
        <View className="flex-row justify-between px-12">
          <TouchableOpacity onPress={() => setPhoto(null)}
            className="h-10 flex-row items-center justify-center">
            <Entypo name="retweet" size={28} color='#f1f1f1' />
            <Text className="font-bold text-gray-200 ml-3">Re-take</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={savePicture}
            className="h-10 flex-row items-center justify-center">
            <Entypo name="check" size={28} color='#f1f1f1' />
            <Text className="font-bold text-gray-200 ml-3">Save</Text>
          </TouchableOpacity>
          {/* <Button title="Save" onPress={savePicture} icon="check" /> */}
        </View>
      ) : (
        <TouchableOpacity onPress={takePicture}
          className="h-10 flex-row items-center justify-center">
          <Entypo name="camera" size={28} color='#f1f1f1' />
          <Text className="font-bold text-gray-200 ml-3">Take a picture</Text>
        </TouchableOpacity>
        // <Button title="Take a picture" onPress={takePicture} icon="camera" />
      )}
    </View>
  </View>
  );
}