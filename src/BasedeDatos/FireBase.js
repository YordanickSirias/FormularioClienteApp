// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPfz1lkg4t-xtbPuhDNk3nipEA5pGDoJc",
  authDomain: "formularioclienteapp.firebaseapp.com",
  projectId: "formularioclienteapp",
  storageBucket: "formularioclienteapp.firebasestorage.app",
  messagingSenderId: "195668462887",
  appId: "1:195668462887:web:400723965fe84569366d02"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;