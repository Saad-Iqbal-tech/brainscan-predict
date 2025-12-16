import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAr1GVSoXOSeqD3IylCHKK_jQRKH8yQGU4",
  authDomain: "braintumordetection-4a448.firebaseapp.com",
  projectId: "braintumordetection-4a448",
  storageBucket: "braintumordetection-4a448.firebasestorage.app",
  messagingSenderId: "882132902484",
  appId: "1:882132484:web:51b5143f9b5d0e125d03c1",
  measurementId: "G-C7YSEEXJZM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
