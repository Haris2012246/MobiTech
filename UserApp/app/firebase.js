import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDn0gTR40wSzcytGB1ojTH7W56-HmL2zRY",
    authDomain: "mobitech-d6a9f.firebaseapp.com",
    projectId: "mobitech-d6a9f",
    storageBucket: "mobitech-d6a9f.appspot.com",
    messagingSenderId: "388164602810",
    appId: "1:388164602810:web:32a10061db0fd2fd8a2b83",
    measurementId: "G-1Q5JC4MV1V",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export const db = firebase.database();
    