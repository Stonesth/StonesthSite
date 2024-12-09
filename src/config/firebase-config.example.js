import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Fonction pour obtenir les variables d'environnement de manière sécurisée
export const getEnvironmentVariable = async (variableName) => {
  try {
    const getConfig = httpsCallable(functions, 'getConfig');
    const result = await getConfig({ variable: variableName });
    return result.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la variable d\'environnement:', error);
    throw error;
  }
};
