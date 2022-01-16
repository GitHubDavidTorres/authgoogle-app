// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBKTEXA120nnjsGPsED7XlDBRYLP4dEPZ0',
  authDomain: 'login-app-c3b04.firebaseapp.com',
  projectId: 'login-app-c3b04',
  storageBucket: 'login-app-c3b04.appspot.com',
  messagingSenderId: '37925737203',
  appId: '1:37925737203:web:4ef91193f1940595ee1d86',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();

export { auth, provider, db };
