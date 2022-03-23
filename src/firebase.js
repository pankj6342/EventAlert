// import { firebase } from "firebase";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyArkZjIu_jj2cIVQw4-ZcSj7tzsSPS80M4",
//   authDomain: "codepanda-26684.firebaseapp.com",
//   projectId: "codepanda-26684",
//   storageBucket: "codepanda-26684.appspot.com",
//   messagingSenderId: "525189928031",
//   appId: "1:525189928031:web:6f3f2e598ea6af40d037ea",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCzTV2nUB-_548-Lp1Iisbml4meQPzRfAI",
  authDomain: "eventalert-92e92.firebaseapp.com",
  projectId: "eventalert-92e92",
  storageBucket: "eventalert-92e92.appspot.com",
  messagingSenderId: "11123648716",
  appId: "1:11123648716:web:1ae39b17afc3725ae27a69",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// const googleAuthProvider=
// const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
