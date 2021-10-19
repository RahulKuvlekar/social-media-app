// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth();
// export const auth = firebaseApp.auth();
export default db;
