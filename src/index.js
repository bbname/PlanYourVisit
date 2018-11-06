import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from 'firebase';
import "firebase/auth";
import UserActionCreator from "./actions/UserActionCreator";
import LoginActionCreator from "./actions/LoginActionCreator";

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

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    UserActionCreator.signInUser(user);
    UserActionCreator.isCurrentUserPlanner();
  }
});

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/profile',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // signInSuccessWithAuthResult: () => true,
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          console.log("authResult", authResult)
          let user = authResult.user;
          let credential = authResult.credential;
          let isNewUser = authResult.additionalUserInfo.isNewUser;
          let providerId = authResult.additionalUserInfo.providerId;
          let operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          if(isNewUser){
            firebase.auth().languageCode = 'pl';

            if(user !== null){
                firebase.database().ref('users/' + user.uid).set({
                    id: user.uid,
                    email: user.email,
                    password: null,
                    name: user.displayName
                }).then(function(){
                  firebase.database().ref('visitors/' + user.uid).set({
                      userId: user.uid
                  });
                })
            }
          }

          LoginActionCreator.closeLoginModal(true);
          return false;
        },
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
        }
    }
}

ReactDOM.render(<App uiConfig={uiConfig} />, document.getElementById('app'));
