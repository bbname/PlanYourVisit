import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from 'firebase';
import "firebase/auth";
import UserActionCreator from "./actions/UserActionCreator";
import LoginActionCreator from "./actions/LoginActionCreator"
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

// firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   console.log(error);
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

// let anonymousUser = null;
// var isUserSignedIn = false;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // if(user.isAnonymous){
    //   anonymousUser = firebase.auth().currentUser;
    // }
    // isUserSignedIn = true;
    // console.log(isUserSignedIn);
    UserActionCreator.signInUser(user);
  } else {
    // firebase.auth().signInAnonymously().catch(function(error) {
    //   // Handle Errors here.
    //   console.log(error);
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
    // anonymousUser = firebase.auth().currentUser;
    // UserActionCreator.signInUser(anonymousUser);
    console.log("Użytkownik niezalogowany");
  }
});
// firebase.auth().onAuthStateChanged(user => {
//   console.log("user", user)
//   if(user.isAnonymous){
//     anonymousUser = user;
//   }
// })


const uiConfig = {
    // autoUpgradeAnonymousUsers: true,
    signInFlow: 'popup',
    // signInSuccessUrl: '/signedIn',
    signInSuccessUrl: '/profile',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => true,
        signInFailure: (error) => {
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                return Promise.resolve();
              }
            console.log(error);
            let cred = error.credential;
            // If using Firebase Realtime Database. The anonymous user data has to be
            // copied to the non-anonymous user.
            let app = firebase.app();
            // Save anonymous user data first.
            return app.database().ref('users/' + firebase.auth().currentUser.uid)
                .once('value')
                .then(function(snapshot) {
                    data = snapshot.val();
                    // This will trigger onAuthStateChanged listener which
                    // could trigger a redirect to another page.
                    // Ensure the upgrade flow is not interrupted by that callback
                    // and that this is given enough time to complete before
                    // redirection.
                    return firebase.auth().signInWithCredential(cred);
                })
                .then(function(user) {
                    // Original Anonymous Auth instance now has the new user.
                    // return app.database().ref('users/' + user.uid).set(data);
                })
                .then(function() {
                    // Delete anonymnous user.
                    // return anonymousUser.delete();
                })
                .then(function() {
                    // Clear data in case a new user signs in, and the state change
                    // triggers.
                    // data = null;
                    // FirebaseUI will reset and the UI cleared when this promise
                    // resolves.
                    // signInSuccessWithAuthResult will not run. Successful sign-in
                    // logic has to be run explicitly.
                    window.location.assign('<url-to-redirect-to-on-success>');
                });
        }
    }
}

// ReactDOM.render(<App uiConfig={uiConfig} anonymousUser={anonymousUser} />, document.getElementById('app'));
ReactDOM.render(<App uiConfig={uiConfig} />, document.getElementById('app'));
