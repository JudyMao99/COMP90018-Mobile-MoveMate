import React, { useEffect, useState } from 'react'
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';

import 'firebase/storage';
import useAuth from '../../hook/useAuth';
import { updateProfile } from 'firebase/auth';
import { Avatar, BottomSheet, Button, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import TakePhotoCamera from '../../components/TakePhotoCamera';

const InitAvatar = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState<string>();
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [cameraVisible, setCameraVisible] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.photoURL) {
      setImage(user.photoURL)
    }
  }, [user]);

  
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access photos is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBottomSheetVisible(false);
    }
  };

  const uploadImage = async () => {
    if (image) {
      if (user) {
        updateProfile(user, {
          photoURL: image
        }).then(() => {
          navigation.navigate(ROUTES.SETUP_GOAL);
        }).catch(e => {
          console.log("got error when uploading avatar: ", e);
        })
      }
    } else {
      navigation.navigate(ROUTES.SETUP_GOAL);
    }
  };

  // handle take photo
  const handleTakePhoto = () => {
    setBottomSheetVisible(false);
    setCameraVisible(true);
  }

  const handleChangeAvatar = () => {
    setBottomSheetVisible(true);
  }

  // list of upload options
  type UploadOption = {
    title: string,
    onPress: () => void
  }

  const uploadOpts: UploadOption[] = [
    {
      title: "Take a photo",
      onPress: handleTakePhoto
    },
    {
      title: "Pick an image from camera roll",
      onPress: handlePickImage
    },
    {
      title: "Cancel",
      onPress: () => setBottomSheetVisible(false)
    }
  ]

  return (
    <>
      {cameraVisible ?
        <TakePhotoCamera setImage={setImage} setCameraVisible={setCameraVisible} /> :
        <View className="flex-1 bg-white justify-center items-center">
          <BottomSheet isVisible={bottomSheetVisible} onBackdropPress={() => setBottomSheetVisible(false)}>
            {uploadOpts.map((opt: UploadOption, idx: number) => (
              <ListItem key={idx} onPress={opt.onPress} containerStyle={{ borderBottomWidth: 1, borderColor: "#ccc" }} >
                <ListItem.Content className="py-2.5 pl-1">
                  <ListItem.Title>{opt.title}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
          
          <View className="flex items-center mb-4">
            <Text className="text-4xl">Welcome!</Text>
            <Text>Please upload your avatar!</Text>
          </View>
          <View className="mb-6">
            <Avatar containerStyle={{ backgroundColor: "#EDEDED" }} source={{ uri: image }} size="xlarge" rounded>
              <Avatar.Accessory size={36} onPress={handleChangeAvatar}/>
            </Avatar>
          </View>
          <Button size="lg" radius="md" title={image ? "Upload Image" : "Skip For Now"} onPress={uploadImage} />
        </View>
      }
    </>

  )
}

export default InitAvatar