import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
// const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);

export { FIRESTORE_DB };
