import React from 'react';
import RegisterModal from './RegisterModal.jsx';

class RegisterVisitor extends React.Component{
    constructor(props){
        super(props);
    } 
    
    render() {
        return (
            <RegisterModal 
                modalId = {"registerVisitorModal"}
                modalLabelName = {"registerVisitorModalLabel"}
                modalTitle = {"Zarejestruj się jako klient"}
                isForPlanner = {false}
            />
        );
    }
}

export default RegisterVisitor;