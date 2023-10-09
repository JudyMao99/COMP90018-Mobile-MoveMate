import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import { Button } from 'react-native';
import { ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hook/useAuth';
import { User } from 'firebase/auth';

const MyAccount = () => {
  const navigation = useNavigation();
  const [userDetail, setUserDetail] = useState<User>();
  const { user } = useAuth();

  const handleChangeAvatar = async () => {
    
  }

  useEffect(() => {
    if (user) {
      setUserDetail(user);
    }
  }, [user])
  
  // const user = {
  //   name: 'John Doe',
  //   avatar: 'https://randomuser.me/api/portraits/women/57.jpg',
  // };

  return (
    <View style={styles.container}>
      <Avatar source={{ uri: userDetail?.photoURL ?? "" }} size="large" rounded>
        <Avatar.Accessory size={23} onPress={handleChangeAvatar} />
      </Avatar>
      <Text className="text-2xl font-black">{userDetail?.displayName ?? "Undefined"}</Text>
      <Text className="text-gray-600 mb-5">{userDetail?.email}</Text>
      <Button title="Switch Account" color="#020617"  onPress={() => navigation.navigate(ROUTES.LOGIN)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  // },
});

export default MyAccount;