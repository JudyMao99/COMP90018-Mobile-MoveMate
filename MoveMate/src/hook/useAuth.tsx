import { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('Got User: ', JSON.stringify(user, null, 2));
        setUser(user);
      } else {
        console.log('No user Info, please log in!');
        setUser(null);
      }
    });
    return () => unsub();
  }, []);
  
  return { user }
}

export default useAuth