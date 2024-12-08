// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCAJrebVMCdfaWVyAOB14O-8GLXjcLVBNM",
  authDomain: "jv-secret-script.firebaseapp.com",
  projectId: "jv-secret-script",
  storageBucket: "jv-secret-script.firebasestorage.app",
  messagingSenderId: "229666665525",
  appId: "1:229666665525:web:a1d5f1ef2e3ef986246d7c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth and provider to use in other parts of your app
export { auth, googleProvider };