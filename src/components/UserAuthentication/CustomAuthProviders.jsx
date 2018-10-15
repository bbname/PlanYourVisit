import React from 'react';
import firebase from 'firebase';
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

class CustomAuthProviders extends React.Component{
    constructor(props){
        super(props);

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