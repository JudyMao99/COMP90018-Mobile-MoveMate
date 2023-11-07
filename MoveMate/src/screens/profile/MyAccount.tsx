import React, { useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import 'firebase/storage';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { Avatar, BottomSheet, Button, ListItem } from '@rneui/themed';
import TakePhotoCamera from '../../components/TakePhotoCamera';
import Input from '../../components/Input';
import useAuth from '../../hook/useAuth';



const MyAccount = () => {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [image, setImage] = useState<string>();
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [cameraVisible, setCameraVisible] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? '');
      setEmail(user.email ?? '');
      setImage(user.photoURL ?? undefined)
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

  const handleUpdateProfile = () => {
    if (user) {
      updateProfile(user, { displayName, photoURL: image })
        .then(() => Alert.alert('Profile Updated', 'Your profile has been updated successfully.'))
        .catch(error => Alert.alert('Error', error.message));
    }
  };

  const handleUpdateEmail = () => {
    if (user) {
      updateEmail(user, email)
        .then(() => Alert.alert('Email Updated', 'Your email has been updated successfully.'))
        .catch(error => Alert.alert('Error', error.message));
    }
  };

  const handleUpdatePassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          Alert.alert('Password Updated', 'Your password has been updated successfully.');
          setNewPassword(''); // clear the password field
        })
        .catch(error => Alert.alert('Error', error.message));
    }
  };

  return (
    <>
    {cameraVisible ?
      <TakePhotoCamera setImage={setImage} setCameraVisible={setCameraVisible} /> :
      <>
        <BottomSheet isVisible={bottomSheetVisible} onBackdropPress={() => setBottomSheetVisible(false)}>
          {uploadOpts.map((opt: UploadOption, idx: number) => (
            <ListItem key={idx} onPress={opt.onPress} containerStyle={{ borderBottomWidth: 1, borderColor: "#ccc" }} >
              <ListItem.Content className="py-2.5 pl-1">
                <ListItem.Title>{opt.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
        <View className="bg-white flex-1 flex-col p-4 gap-y-1">
          <View className='flex justify-center items-center mb-6'>
            <Avatar containerStyle={{ backgroundColor: "#DDD" }} source={{ uri: image }} size="xlarge" rounded>
              <Avatar.Accessory size={36} onPress={handleChangeAvatar}/>
            </Avatar>
          </View>
          <Input
            title="User Name"
            value={displayName}
            placeholder="Enter User Name"
            onChangeText={(val: string) => setDisplayName(val)}
          />
          <Input
            title="Email Address"
            value={email}
            placeholder="Enter Email Address"
            onChangeText={(val: string) => setEmail(val)}
          />
          <Input
            title="New Password"
            value={newPassword}
            placeholder="Enter New Password"
            onChangeText={(val: string) => setNewPassword(val)}
            secureTextEntry
          />

          <View className="flex items-center gap-y-3">
            <TouchableOpacity className="py-2 bg-blue-brand rounded-md w-48" onPress={handleUpdateProfile}>
              <Text className=" text-sm font-bold text-center text-white">
                Update Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 bg-blue-brand rounded-md w-48" onPress={handleUpdateEmail}>
              <Text className="font-bold text-center text-white">
                Update Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 bg-blue-brand rounded-md w-48" onPress={handleUpdatePassword}>
              <Text className="font-bold text-center text-white">
                Update Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    }
    </>
  );
};

export default MyAccount;
