// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaef6pxHW0SIzJYhPwqsbMk65lzmldxWI",
  authDomain: "mobile-movemate.firebaseapp.com",
  projectId: "mobile-movemate",
  storageBucket: "mobile-movemate.appspot.com",
  messagingSenderId: "303461517165",
  appId: "1:303461517165:web:03601dc82341fdf33bfc64",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Provide persistence config to auth
const auth = getAuth();
auth.setPersistence(getReactNativePersistence(ReactNativeAsyncStorage));

export { auth };


