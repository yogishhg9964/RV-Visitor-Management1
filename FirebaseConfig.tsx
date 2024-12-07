// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ysGTUgUrKSTS5XH8Nvb_NlstbSlPHE4",
  authDomain: "rv-visitor-management.firebaseapp.com",
  projectId: "rv-visitor-management",
  storageBucket: "rv-visitor-management.firebasestorage.app",
  messagingSenderId: "659878986292",
  appId: "1:659878986292:web:10e0f58c20029d16084061",
  measurementId: "G-34Y88G8X56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();