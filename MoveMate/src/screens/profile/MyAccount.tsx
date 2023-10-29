import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import { Button } from 'react-native';
import { ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hook/useAuth';
import { User,updateProfile,updateEmail,updatePassword,getAuth,signOut} from 'firebase/auth';

const MyAccount = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? '');
      setEmail(user.email ?? '');
    }
  }, [user]);

  const handleUpdateProfile = () => {
    if (user) {
      updateProfile(user, { displayName, photoURL: user.photoURL })
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
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate(ROUTES.LOGIN); // 导航到登录页面
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Avatar source={{ uri: user?.photoURL ?? "" }} size="large" rounded>
        <Avatar.Accessory size={23} />
      </Avatar>
      <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} placeholder="Display Name" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="Password" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUpdateEmail}>
        <Text style={styles.buttonText}>Update Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut} style={styles.touchable}>
        <Text style={styles.buttonText}>Switch Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: 'center',
  },
  touchable: {
    backgroundColor: "#020617",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default MyAccount;
