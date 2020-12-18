import firebase from "firebase";
import "firebase/firestore";

//Change this to own Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCO1YqLUk-nlpP3lXruaEY3x0XKJHtWqaM",
  authDomain: "acabapp-31bd5.firebaseapp.com",
  projectId: "acabapp-31bd5",
  storageBucket: "acabapp-31bd5.appspot.com",
  messagingSenderId: "780165440925",
  appId: "1:780165440925:web:7e04c6d4910ad2d6e9fb74",
  measurementId: "G-W9GLPS9DBG",
};

//Don't touch if you don't know how to do.

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
