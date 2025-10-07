// firebase.js - REPLACE YOUR EXISTING FILE WITH THIS
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFvX-0uW2REnGfEQ0QcgNbKNziYv-Kn6A",
  authDomain: "mitredu.firebaseapp.com",
  projectId: "mitredu",
  storageBucket: "mitredu.firebasestorage.app",
  messagingSenderId: "332886491147",
  appId: "1:332886491147:web:0a590cf5e5fbaf4c0ec70e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Enable network for Firestore (fixes offline error)
// This forces Firestore to connect
if (typeof window !== 'undefined') {
  // Log when Firestore is ready
  console.log('🔥 Firebase initialized');
  console.log('📊 Firestore database:', firebaseConfig.projectId);
}

export default app;