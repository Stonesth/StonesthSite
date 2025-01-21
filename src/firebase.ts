// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaWyNFz7YQwkNo4WDvG4Crvb8IhqnWQws",
  authDomain: "monsite-5f920.firebaseapp.com",
  projectId: "monsite-5f920",
  storageBucket: "monsite-5f920.firebasestorage.app",
  messagingSenderId: "918092083994",
  appId: "1:918092083994:web:611d1938d7cbc7257c72a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Configure la persistance locale et initialise l'authentification
export const initializeAuth = async () => {
  try {
    console.log('Initializing auth persistence...');
    await setPersistence(auth, browserLocalPersistence);
    auth.useDeviceLanguage(); // Pour avoir les messages d'erreur en français
    console.log('Auth persistence initialized successfully');
    return true;
  } catch (error) {
    console.error("Erreur de configuration de la persistance:", error);
    return false;
  }
};

export const db = getFirestore(app);

export default app;
