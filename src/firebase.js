// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import firebase from "./firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYcxe58-RKW7sIEXxNmJdFyTkP4bjoq-0",
  authDomain: "fcm-notifications-c43cf.firebaseapp.com",
  projectId: "fcm-notifications-c43cf",
  storageBucket: "fcm-notifications-c43cf.appspot.com",
  messagingSenderId: "176443577046",
  appId: "1:176443577046:web:616da86eee1becd836af77",
  measurementId: "G-QZ8N68D0Y7",
};

const FCM_KEY =
  "BFCNCOHhQJ8Jox1-lDhOL4WRSFZbqUiAe-7WyvUBZiPpvXNlP3Ic7I1cRg34efqSoUJL8wyGQElhCj9w3mcmU_I";

// Initialize Firebase
initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);
// export default fire;

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: FCM_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
