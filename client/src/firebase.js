// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-RY0CrEzHA1MCZhYTaxsUNglkBAfeEXg",
  authDomain: "synergy-72f29.firebaseapp.com",
  projectId: "synergy-72f29",
  storageBucket: "synergy-72f29.firebasestorage.app",
  messagingSenderId: "781440797918",
  appId: "1:781440797918:web:cd39d107595d579d98464f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);


export { storage };