import { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
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