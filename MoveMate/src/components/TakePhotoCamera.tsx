import { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import IconButton from './IconButton';

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
        <Camera className="flex-1" type={type} ref={cameraRef} >
          <View className="flex-row self-end px-6 py-2">
            <IconButton handleOnPress={toggleCameraType} icon="retweet" />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: photo }} className="flex-1"/>
      )}
    <View className="pb-6 pt-2">
      {photo ? (
        <View className="flex-row justify-between px-12">
          <IconButton title="Re-take" handleOnPress={() => setPhoto(null)} icon="retweet" />
          <IconButton title="Save" handleOnPress={savePicture} icon="check" />
        </View>
        ) : (
        <IconButton title="Take a picture" handleOnPress={takePicture} icon="camera" />
      )}
    </View>
  </View>
  );
}