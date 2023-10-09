import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      console.log('got user: ', user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);
  
  return { user }
}

export default useAuth