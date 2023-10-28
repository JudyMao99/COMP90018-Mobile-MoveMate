import BottomTabNavigator from './BottomTabNavigator';
import useAuth from '../hook/useAuth';
import AuthNavigator from './AuthNavigator';
import { useEffect, useState } from 'react';
import UserSetupNavigator from './UserSetupNavigator';
import { DocumentSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function AppNavigator() {
  const { user } = useAuth();

  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      // TODO: use global variable to check if the user is a new user
      getDoc(doc(db, "users", user.uid))
        .then((docSnap: DocumentSnapshot) => {
          if (!docSnap.exists()) {
            setIsNewUser(true);
          }
        }).catch((e) => {
          console.log(e);
        })
    }
  }, [user])
  
  return user ? (
    isNewUser ? <UserSetupNavigator/> : <BottomTabNavigator />
  ) : <AuthNavigator />
}

export default AppNavigator;