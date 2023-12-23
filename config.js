

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
    getDatabase,
    set,
    ref,
    get,
    child,
    onChildAdded,
    push,
    query,
    equalTo,
    orderByChild,

} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as Sref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQjlwhuwWYJ-OdhhPP4XRxEgWSfQ5d3-o",
  authDomain: "ali-raza-518df.firebaseapp.com",
  databaseURL: "https://ali-raza-518df-default-rtdb.firebaseio.com",
  projectId: "ali-raza-518df",
  storageBucket: "ali-raza-518df.appspot.com",
  messagingSenderId: "308309137877",
  appId: "1:308309137877:web:ac0be37dd3c2bb9544055c",
  measurementId: "G-82NM2JZS9D"
};
const app = initializeApp(firebaseConfig);

var auth = getAuth(app)
var db = getDatabase(app)
var storage = getStorage();
var googleProvider = new GoogleAuthProvider()
var githubProvider = new GithubAuthProvider()


export {
    auth,
    db,
    storage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    googleProvider,
    githubProvider,
    signInWithPopup,
    set,
    ref,
    get,
    child,
    Sref,
    uploadBytesResumable,
    getDownloadURL,
    push,
    query,
    equalTo,
    orderByChild,
  
}
