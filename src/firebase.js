import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// replace this with the firebaseConfig from your firebase project
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); //database
const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = () => {
  localStorage.setItem("authLoading", "loading...");
  auth
    .signInWithRedirect(googleProvider)
    .then((res) => {})
    .catch((error) => {
      localStorage.removeItem("authLoading");
      console.log(error);
    });
};

export { db, auth, firebaseApp, signInWithGoogle };
