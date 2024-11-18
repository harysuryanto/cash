import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  // @ts-expect-error
  getReactNativePersistence, // See error details https://github.com/firebase/firebase-js-sdk/issues/8332
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnDW1wh6_Lztl_Zk1pCQd5foePkgGtuiE",
  authDomain: "cash-853a6.firebaseapp.com",
  projectId: "cash-853a6",
  storageBucket: "cash-853a6.appspot.com",
  messagingSenderId: "214547434392",
  appId: "1:214547434392:web:a517d64a0ea7da9476b9ed",
  measurementId: "G-2FBNNT5WHN",
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);

export { FIRESTORE_DB, FIREBASE_AUTH };
