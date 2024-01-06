// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8R31qw43zprmGdDfxi1jV28Iv8lUtSRk",
  authDomain: "react-site-c9b95.firebaseapp.com",
  projectId: "react-site-c9b95",
  storageBucket: "react-site-c9b95.appspot.com",
  messagingSenderId: "315668909720",
  appId: "1:315668909720:web:77fd5e48054e1de987caed",
  measurementId: "G-8X0CQPN3EJ",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, db, auth };
