import React from 'react';
import RegisterModal from './RegisterModal.jsx';

class RegisterPlanner extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <RegisterModal 
                modalId = {"registerPlannerModal"}
                modalLabelName = {"registerPlannerModalLabel"}
                modalTitle = {"Zarejestruj się jako przedsiębiorca"}
                isForPlanner = {true}
            />
        );
    }
}

export default RegisterPlanner;