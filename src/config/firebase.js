import firebase from "firebase";

const firebaseConfig = {
  apiKey: "FIREBASE",
  authDomain: "FIREBASE",
  databaseURL: "FIREBASE",
  projectId: "FIREBASE",
  storageBucket: "FIREBASE",
  messagingSenderId: "FIREBASE",
  appId: "FIREBASE",
};

firebase.initializeApp(firebaseConfig);

export default {
    firebase,
}