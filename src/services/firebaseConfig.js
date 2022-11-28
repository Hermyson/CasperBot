
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYXWcM6dGftoDOwpJ0IdngQA2F503lp-M",
  authDomain: "casperbotnoticias.firebaseapp.com",
  projectId: "casperbotnoticias",
  storageBucket: "casperbotnoticias.appspot.com",
  messagingSenderId: "604306548116",
  appId: "1:604306548116:web:dd09ff7cdcaf0d4338db81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


