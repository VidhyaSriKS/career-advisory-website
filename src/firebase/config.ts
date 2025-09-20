// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn5-O8KGPemjBigx1cJaK_reX2kXwic28",
  authDomain: "nexora-findyourcareerpath.firebaseapp.com",
  projectId: "nexora-findyourcareerpath",
  storageBucket: "nexora-findyourcareerpath.firebasestorage.app",
  messagingSenderId: "885120185993",
  appId: "1:885120185993:web:9fbdf44761facc23da7858",
  measurementId: "G-JBZTBSN3W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in the browser environment
export let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export default app;
