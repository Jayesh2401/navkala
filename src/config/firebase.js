import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZZk7eZIza2pD4D3Tt-QMZWmUGZGmnV08",
  authDomain: "retro-app-2025.firebaseapp.com",
  projectId: "retro-app-2025",
  storageBucket: "retro-app-2025.firebasestorage.app",
  messagingSenderId: "358273281250",
  appId: "1:358273281250:web:1e07cd7bdb5817dbae42bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
