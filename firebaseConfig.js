import exp from "constants";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyB0yvL8QTZORJHuN7KHG1l_BJfYsKjWVaE",
  authDomain: "ebike-eb4df.firebaseapp.com",
  projectId: "ebike-eb4df",
  storageBucket: "ebike-eb4df.appspot.com",
  messagingSenderId: "500658682494",
  appId: "1:500658682494:web:4646becf97a3c81850b62f",
  measurementId: "G-ZWRPRXS02P",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const rtdb = firebase.database();

export default firebase;
