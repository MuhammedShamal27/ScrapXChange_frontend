importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

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
firebase.initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'  // optional icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
