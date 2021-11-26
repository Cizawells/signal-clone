import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCgTiANZnejmkR5CuIcvl25fqjhPcIWFI",
  authDomain: "signal-clone-70282.firebaseapp.com",
  projectId: "signal-clone-70282",
  storageBucket: "signal-clone-70282.appspot.com",
  messagingSenderId: "967619535365",
  appId: "1:967619535365:web:0b2a6382a080f2c594f26c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore();

export {db, auth};