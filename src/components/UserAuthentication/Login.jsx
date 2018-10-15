import React from 'react';
import LoginModal from './LoginModal.jsx';
import CustomAuthProviders from './CustomAuthProviders.jsx';

class Login extends React.Component{
    constructor(props){
        super(props);
    } 
    
    render() {
        return (
            <LoginModal 
                modalId = {"loginModal"}
                modalLabelName = {"loginModalLabel"}
                modalTitle = {"Zaloguj się"}
                additionalLogins = {<CustomAuthProviders
                                        uiConfig = {this.props.uiConfig}
                                    />}
            />
        );
    }
}

export default Login;