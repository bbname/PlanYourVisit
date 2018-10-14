import React from 'react';
import RegisterModal from './RegisterModal.jsx';
import CustomAuthProviders from './CustomAuthProviders.jsx';

class RegisterVisitor extends React.Component{
    constructor(props){
        super(props);
    } 

    // additionalLogins taki prop dla przeslania dodatkowych providerow takich jak fb i google
    
    render() {
        return (
            <RegisterModal 
                modalId = {"registerVisitorModal"}
                modalLabelName = {"registerVisitorModalLabel"}
                modalTitle = {"Zarejestruj się jako klient"}
                isForPlanner = {false}
                // additionalLogins = {<CustomAuthProviders />}
            />
        );
    }
}

export default RegisterVisitor;