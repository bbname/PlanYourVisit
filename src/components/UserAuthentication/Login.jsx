import React from 'react';
import LoginModal from './LoginModal.jsx';
import CustomAuthProviders from './CustomAuthProviders.jsx';

class Login extends React.Component{
    constructor(props){
        super(props);
    } 

    // additionalLogins taki prop dla przeslania dodatkowych providerow takich jak fb i google
    
    render() {
        return (
            <LoginModal 
                modalId = {"loginModal"}
                modalLabelName = {"loginModalLabel"}
                modalTitle = {"Zaloguj się"}
                additionalLogins = {<CustomAuthProviders
                                        uiConfig = {this.props.uiConfig}
                                        // anonymousUser = {this.props.anonymousUser}
                                    />}
            />
        );
    }
}

export default Login;