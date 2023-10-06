import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import { Button } from 'react-native';
import { ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const MyAccount = () => {
  const navigation = useNavigation();
  const user = {
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/women/57.jpg',
  };

  return (
    <View style={styles.container}>
      <Avatar source={{ uri: user.avatar }} size="large" rounded>
      <Avatar.Accessory size={23} />
      </Avatar>
      <Text style={styles.title}>{user.name}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MyAccount;