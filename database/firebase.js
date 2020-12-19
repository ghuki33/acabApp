import firebase from "firebase";
import "firebase/firestore";

//Change this to own Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCYuGTDYS2NtGeRMZBylpIPz2-FRml8DEA",
  authDomain: "acabaap.firebaseapp.com",
  projectId: "acabaap",
  storageBucket: "acabaap.appspot.com",
  messagingSenderId: "384166023517",
  appId: "1:384166023517:web:ef1ad3bfb20b88d54798b4",
  measurementId: "G-J1MFGGQS00",
};

//Don't touch if you don't know how to do.

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
