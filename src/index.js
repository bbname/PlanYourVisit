import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from 'firebase'
import "firebase/auth"

  // Initialize Firebase

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
  };

  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('app'));