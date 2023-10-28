import React, { useEffect, useState } from 'react'
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import 'firebase/storage';
import useAuth from '../../hook/useAuth';
import { updateProfile } from 'firebase/auth';
import { Avatar, BottomSheet, Button, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const InitAvatar = () => {
  const { user } = useAuth();
  const [image, setImage] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (user && user.photoURL) {
      // get photoUrl from user
      setImage(user.photoURL)
    }
  }, [user]);

  
  const pickImage = async () => {
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
      setIsVisible(false);
    }
  };
  
  const takePhoto = async () => {
    // TODO
  };

  const uploadImage = async () => {
    if (image) {
      if (user) {
        updateProfile(user, {
          photoURL: image
        }).then(() => {
          console.log("photo uploaded!");
          navigation.navigate(ROUTES.SETUP_GOAL);
        }).catch(e => {
          console.log("got error when uploading avatar: ", e);
        })
      }
    } else {
      console.log("No photo provided, skip for now!");
      navigation.navigate(ROUTES.SETUP_GOAL);
    }


  };

  const handleChangeAvatar = () => {
    setIsVisible(true);
  }

  // list of upload options
  type UploadOption = {
    title: string,
    onPress: () => void
  }
  const uploadOpts: UploadOption[] = [
    {
      title: "Take a photo",
      onPress: takePhoto
    },
    {
      title: "Pick an image from camera roll",
      onPress: pickImage
    },
    {
      title: "Cancel",
      onPress: () => setIsVisible(false)
    }
  ]

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      >
        {uploadOpts.map((opt: UploadOption, idx: number) => (
          <ListItem
            key={idx}
            onPress={opt.onPress}
            containerStyle={{
              borderBottomWidth: 1,
              borderColor: "#ccc"
            }}
          >
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
          <View className="bg-gray-500"></View>
          <Avatar.Accessory size={36} onPress={handleChangeAvatar}/>
        </Avatar>
      </View>
      <Button size="lg" radius="md" title={image ? "Upload Image" : "Skip For Now"} onPress={uploadImage} />

    </View>
  )
}

export default InitAvatar