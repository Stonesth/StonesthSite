import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDNFLBKlpVxoFgQvDnkrLBfLr_JyLgUK1U",
    authDomain: "monsite-5f920.firebaseapp.com",
    projectId: "monsite-5f920",
    storageBucket: "monsite-5f920.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:1234567890abcdef"
};

// Initialiser Firebase seulement s'il n'est pas déjà initialisé
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export { db, auth };
