import React from 'react';
import RegisterStore from "../../stores/RegisterStore"
import RegisterActionCreator from "../../actions/RegisterActionCreator"

class RegisterForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: RegisterStore.getEmail(),
            password: RegisterStore.getPassword(),
            passwordConfirmation: RegisterStore.getPasswordConfirmation(),
            name: RegisterStore.getName(),
            companyName: RegisterStore.getCompanyName(),
            _emailId: this.getIdForInput("email"),
            _passwordId: this.getIdForInput("password"),
            _passwordConfirmationId: this.getIdForInput("password-confirmation"),
            _nameId: this.getIdForInput("name")
        }

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        RegisterStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        RegisterStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            email : RegisterStore.getEmail(),
            password: RegisterStore.getPassword(),
            passwordConfirmation: RegisterStore.getPasswordConfirmation(),
            name: RegisterStore.getName(),
            companyName: RegisterStore.getCompanyName()
        })
    }

    handleOnInputChange = (e) =>{
        if(e.target.id === this.state._emailId){
            RegisterActionCreator.setEmail(e.target.value);
        }
        else if(e.target.id ===  this.state._passwordId){
            RegisterActionCreator.setPassword(e.target.value);
        }
        else if(e.target.id ===  this.state._passwordConfirmationId){
            RegisterActionCreator.setPasswordConfirmation(e.target.value);
        }
        else if(e.target.id ===  this.state._nameId){
            RegisterActionCreator.setName(e.target.value);
        }
        else if(e.target.id === "company-name"){
            RegisterActionCreator.setCompanyName(e.target.value);
        }
    }

    generateInputForPlanner(){
        if(this.props.isRegisterForPlanner === true){
            return (
                <div className="form-group">
                    <label htmlFor="company-name" className="col-form-label">Nazwa firmy:</label>
                    <input value={this.state.companyName} onChange={this.handleOnInputChange} type="text" className="form-control" id="company-name" />
                </div>   
            );
        }
    }

    getIdForInput(inputId){
        if(this.props.isRegisterForPlanner === true){
            return inputId.concat("-planner");
        }
        else{
            return inputId;
        }
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="email" className="col-form-label">E-mail:</label>
                    <input value={this.state.email} onChange={this.handleOnInputChange} type="email" className="form-control" id={this.state._emailId}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-form-label">Hasło:</label>
                    <input value={this.state.password} onChange={this.handleOnInputChange} type="password" className="form-control" id={this.state._passwordId} />
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirmation" className="col-form-label">Potwierdź hasło:</label>
                    <input value={this.state.passwordConfirmation} onChange={this.handleOnInputChange} type="password" className="form-control" id={this.state._passwordConfirmationId} />
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="col-form-label">Imię i nazwisko:</label>
                    <input value={this.state.name} onChange={this.handleOnInputChange} type="text" className="form-control" id={this.state._nameId} />
                </div>
                {this.generateInputForPlanner()}
            </form>
        );
    }
}

export default RegisterForm;