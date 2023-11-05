import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaef6pxHW0SIzJYhPwqsbMk65lzmldxWI",
  authDomain: "mobile-movemate.firebaseapp.com",
  projectId: "mobile-movemate",
  storageBucket: "mobile-movemate.appspot.com",
  messagingSenderId: "303461517165",
  appId: "1:303461517165:web:03601dc82341fdf33bfc64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export { auth, db };

// IOS: 567092706586-8tlk7ariv0erl08nb9bmn69mhva2ncof.apps.googleusercontent.com
// Android: 567092706586-23l8rda3a1a2a4fcnrnss0u4ehpcbiob.apps.googleusercontent.com
