import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3CfN8sFWTPkkGVm6qeEf16cyfm_ubrA4",
  authDomain: "andrewlucas-dev.firebaseapp.com",
  databaseURL: "https://andrewlucas-dev-default-rtdb.firebaseio.com",
  projectId: "andrewlucas-dev",
  storageBucket: "andrewlucas-dev.appspot.com",
  messagingSenderId: "725991828727",
  appId: "1:725991828727:web:2275d05067854426d537f2",
  measurementId: "G-YLSGDCFXD0"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
