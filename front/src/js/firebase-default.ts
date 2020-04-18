import firebase from "firebase/app"

export default () => {
  firebase.initializeApp({
    apiKey: "AIzaSyBPaNnejjkOsye3WV1DsSh0rwBJaAqVeD0",  // Auth / General Use
    applicationId: "1:27992087142:web:ce....",          // General Use
    projectId: "eb-portfolio",                          // General Use
    authDomain: "eb-portfolio.firebaseapp.com",         // Auth with popup/redirect
    databaseURL: "https://eb-portfolio.firebaseio.com", // Realtime Database
    storageBucket: "eb-portfolio.appspot.com",          // Storage
    // messagingSenderId: "123456789",                     // Cloud Messaging
    // appID: "app-id",
  })
}