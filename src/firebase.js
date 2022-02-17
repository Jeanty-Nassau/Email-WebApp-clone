import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC-0Gn0ixx7iXQoYfEFIr7CLk3yExPZ_BA",
  authDomain: "email-app-clone.firebaseapp.com",
  projectId: "email-app-clone",
  storageBucket: "email-app-clone.appspot.com",
  messagingSenderId: "316507647521",
  appId: "1:316507647521:web:68942cd98609f3f3237d60"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };