import { initializeApp } from "firebase/app";
import { getMessaging ,getToken } from "firebase/messaging";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqrde-K2gSSJERsTcd4F9rTskXlZy9-WE",
  authDomain: "scrapxchange-5b162.firebaseapp.com",
  projectId: "scrapxchange-5b162",
  storageBucket: "scrapxchange-5b162.firebasestorage.app",
  messagingSenderId: "14856905846",
  appId: "1:14856905846:web:b7a580f653dbd42eaceb57",
  measurementId: "G-JB83P3XRJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Messaging
const messaging = getMessaging(app);

export { messaging };