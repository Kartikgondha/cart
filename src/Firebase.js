// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoS1dgHAzaYhYTlv4uhlJE_dz-EBdxOM0",
  authDomain: "cart-project-b8947.firebaseapp.com",
  projectId: "cart-project-b8947",
  storageBucket: "cart-project-b8947.appspot.com",
  messagingSenderId: "297324579190",
  appId: "1:297324579190:web:0671e6427c41d3e5b75257",
  measurementId: "G-BG710RM8ZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
