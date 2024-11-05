import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFyG7oXORoJWiL2CF_vWaNTcV1hkV2CKA",
  authDomain: "hotelbookingroom-fdf46.firebaseapp.com",
  projectId: "hotelbookingroom-fdf46",
  storageBucket: "hotelbookingroom-fdf46.appspot.com",
  messagingSenderId: "354501668366",
  appId: "1:354501668366:web:10861ffcc4110134c1565f",
  measurementId: "G-NPRYJN2N3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;