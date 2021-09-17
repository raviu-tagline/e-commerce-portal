import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDRstnEZqEV9_zaifl3nrY1i99kGOj0kq4",
    authDomain: "e-commerce-portal-ae2a3.firebaseapp.com",
    databaseURL: "https://e-commerce-portal-ae2a3-default-rtdb.firebaseio.com",
    projectId: "e-commerce-portal-ae2a3",
    storageBucket: "e-commerce-portal-ae2a3.appspot.com",
    messagingSenderId: "995303145985",
    appId: "1:995303145985:web:19a3e4da9576fc70b27600",
    measurementId: "G-F9WJQFBKP9"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

const db = firebase.firestore();

export default db