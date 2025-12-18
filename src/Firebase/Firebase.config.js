// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUjySqzcZmih2N0nQhKbw_jAWI9ycXNms",
  authDomain: "clean-community-92de5.firebaseapp.com",
  projectId: "clean-community-92de5",
  storageBucket: "clean-community-92de5.firebasestorage.app",
  messagingSenderId: "855074722810",
  appId: "1:855074722810:web:82214975cf3ac4533dca43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);