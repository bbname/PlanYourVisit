import React from 'react';
import firebase from 'firebase';
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

// const anonymousUser = firebase.auth().currentUser;

// const uiConfig = {
//     autoUpgradeAnonymousUsers: true,
//     signInFlow: 'popup',
//     signInSuccessUrl: '/signedIn',
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     ],
//     callbacks: {
//         signInSuccessWithAuthResult: () => true,
//         signInFailure: (error) => {
//             if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
//                 return Promise.resolve();
//               }

//             let cred = error.credential;
//             // If using Firebase Realtime Database. The anonymous user data has to be
//             // copied to the non-anonymous user.
//             let app = firebase.app();
//             // Save anonymous user data first.
//             return app.database().ref('users/' + firebase.auth().currentUser.uid)
//                 .once('value')
//                 .then(function(snapshot) {
//                     data = snapshot.val();
//                     // This will trigger onAuthStateChanged listener which
//                     // could trigger a redirect to another page.
//                     // Ensure the upgrade flow is not interrupted by that callback
//                     // and that this is given enough time to complete before
//                     // redirection.
//                     return firebase.auth().signInWithCredential(cred);
//                 })
//                 .then(function(user) {
//                     // Original Anonymous Auth instance now has the new user.
//                     return app.database().ref('users/' + user.uid).set(data);
//                 })
//                 .then(function() {
//                     // Delete anonymnous user.
//                     return anonymousUser.delete();
//                 })
//                 .then(function() {
//                     // Clear data in case a new user signs in, and the state change
//                     // triggers.
//                     data = null;
//                     // FirebaseUI will reset and the UI cleared when this promise
//                     // resolves.
//                     // signInSuccessWithAuthResult will not run. Successful sign-in
//                     // logic has to be run explicitly.
//                     window.location.assign('<url-to-redirect-to-on-success>');
//                 });
//         }
//     }
// }

class CustomAuthProviders extends React.Component{
    constructor(props){
        super(props);

    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            console.log("user", user)
          });
    }

    render() {
        return (
            <StyledFirebaseAuth 
            uiConfig = {this.props.uiConfig}
            firebaseAuth = {firebase.auth()}
            />
        );
    }
}

export default CustomAuthProviders;