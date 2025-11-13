// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMoR5bgQKGz9RvlQUiH3Mt0i2zlvPw5Z8",
  authDomain: "peer-project-hub-dde4c.firebaseapp.com",
  projectId: "peer-project-hub-dde4c",
  storageBucket: "peer-project-hub-dde4c.firebasestorage.app",
  messagingSenderId: "451859005811",
  appId: "1:451859005811:web:99bcf50be01a7866574506",
  measurementId: "G-6SM4VLLBLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };