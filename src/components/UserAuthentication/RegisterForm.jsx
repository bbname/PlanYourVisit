import React from 'react';
import RegisterStore from "../../stores/RegisterStore"
import RegisterActionCreator from "../../actions/RegisterActionCreator"
import "../styles/layout-style.css";

class RegisterForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isRegisterBtnClicked: RegisterStore.isRegisterBtnClicked(),
            email: RegisterStore.getEmail(),
            isEmailValid: RegisterStore.isEmailValid(),
            password: RegisterStore.getPassword(),
            isPasswordValid: RegisterStore.isPasswordValid(),
            passwordErrorMessage: RegisterStore.getPasswordErrorMessage(),
            passwordConfirmation: RegisterStore.getPasswordConfirmation(),
            isPasswordConfirmationValid: RegisterStore.isPasswordCofirmationValid(),
            name: RegisterStore.getName(),
            isNameValid: RegisterStore.isNameValid(),
            companyName: RegisterStore.getCompanyName(),
            isCompanyNameValid: RegisterStore.isCompanyNameValid(),
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
            isRegisterBtnClicked: RegisterStore.isRegisterBtnClicked(),
            email : RegisterStore.getEmail(),
            isEmailValid: RegisterStore.isEmailValid(),
            password: RegisterStore.getPassword(), isPasswordValid: RegisterStore.isPasswordValid(),
            isPasswordValid: RegisterStore.isPasswordValid(),
            passwordErrorMessage: RegisterStore.getPasswordErrorMessage(),
            passwordConfirmation: RegisterStore.getPasswordConfirmation(),
            isPasswordConfirmationValid: RegisterStore.isPasswordCofirmationValid(),
            name: RegisterStore.getName(),
            isNameValid: RegisterStore.isNameValid(),
            companyName: RegisterStore.getCompanyName(),
            isCompanyNameValid: RegisterStore.isCompanyNameValid()
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
            let companyNameCssClasses = this.getInputCssClasses(this.state.isCompanyNameValid);
            return (
                <div className="form-group">
                    {this.getCompanyNameLabel()}
                    <input className={companyNameCssClasses.join(' ')} value={this.state.companyName} onChange={this.handleOnInputChange} type="text" id="company-name" />
                </div>   
            );
        }
    }

    getCompanyNameLabel(){
        if(this.state.isCompanyNameValid === null  && this.state.isRegisterBtnClicked){
            return <label htmlFor="company-name" className="col-form-label label-invalid">Nazwa firmy: (nieuzupełniona)</label>;
        }
        else if(this.state.isCompanyNameValid === null){
            return <label htmlFor="company-name" className="col-form-label">Nazwa firmy:</label>;
        }
        else if(this.state.isCompanyNameValid === true){
            return <label htmlFor="company-name" className="col-form-label label-valid">Nazwa firmy (poprawna):</label>;
        }
        else if(this.state.isCompanyNameValid === false){
            return <label htmlFor="company-name" className="col-form-label label-invalid">
            Nazwa firmy (niepoprawna) - minimalna ilość znaków w polu to 3:
            </label>;
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

    getEmailLabel(){
        if(this.state.isEmailValid === null && this.state.isRegisterBtnClicked){
            return <label htmlFor="email" className="col-form-label label-invalid">E-mail (nieuzupełniony):</label>;
        }
        else if(this.state.isEmailValid === null){
            return <label htmlFor="email" className="col-form-label">E-mail:</label>;
        }
        else if(this.state.isEmailValid === true){
            return <label htmlFor="email" className="col-form-label label-valid">E-mail (poprawny):</label>;
        }
        else if(this.state.isEmailValid === false){
            return <label htmlFor="email" className="col-form-label label-invalid">E-mail (niepoprawny):</label>;
        }
    }

    getPasswordLabel(){
        if(this.state.isPasswordValid === null && this.state.isRegisterBtnClicked){
            return <label htmlFor="password" className="col-form-label label-invalid">Hasło (nieuzupełnione):</label>;
        }
        else if(this.state.isPasswordValid === null){
            return <label htmlFor="password" className="col-form-label">Hasło:</label>;
        }
        else if(this.state.isPasswordValid === true){
            return <label htmlFor="password" className="col-form-label label-valid">Hasło (poprawne):</label>;
        }
        else if(this.state.isPasswordValid === false){
            let errorMessage = "Hasło (niepoprawne) - ";
            switch(this.state.passwordErrorMessage){
                case "too_short":
                    errorMessage = errorMessage.concat("minimalna ilość znaków w haśle to 6");
                break;
                case "too_long":
                    errorMessage = errorMessage.concat("maksymalna ilość znaków w haśle to 50");
                break;
                case "no_num":
                    errorMessage = errorMessage.concat("w haśle musi znajdować się co najmniej 1 cyfra");
                break;
                case "no_letter":
                    errorMessage = errorMessage.concat("w haśle musi znajdować się co najmniej 1 litera");
                break;
                case "bad_char":
                    errorMessage = errorMessage.concat("w haśle znajdują się niedozwolone znaki");
                break;          
            }
            errorMessage = errorMessage.concat(":");

            return <label htmlFor="password" className="col-form-label label-invalid">{errorMessage}</label>;
        }
    }

    getPasswordConfirmationLabel(){
        if(this.state.isPasswordConfirmationValid === null && this.state.isRegisterBtnClicked){
            return <label htmlFor="password-confirmation" className="col-form-label label-invalid">
            Potwierdź hasło (nieuzupełnione):
            </label>;
        }
        else if(this.state.isPasswordConfirmationValid === null){
            return <label htmlFor="password-confirmation" className="col-form-label">Potwierdź hasło:</label>;
        }
        else if(this.state.isPasswordConfirmationValid === true){
            return <label htmlFor="password-confirmation" className="col-form-label label-valid">
            Potwierdź hasło (poprawne):
            </label>;
        }
        else if(this.state.isPasswordConfirmationValid === false){
            return <label htmlFor="password-confirmation" className="col-form-label label-invalid">
            Potwierdź hasło (niepoprawne) - podane hasła się nie zgadzają:
            </label>;
        }
    }

    getNameLabel(){
        if(this.state.isNameValid === null && this.state.isRegisterBtnClicked){
            return <label htmlFor="name" className="col-form-label label-invalid">Imię i nazwisko (nieuzupełnione):</label>;
        }
        else if(this.state.isNameValid === null){
            return <label htmlFor="name" className="col-form-label">Imię i nazwisko:</label>;
        }
        else if(this.state.isNameValid === true){
            return <label htmlFor="name" className="col-form-label label-valid">Imię i nazwisko (poprawne):</label>;
        }
        else if(this.state.isNameValid === false){
            return <label htmlFor="name" className="col-form-label label-invalid">
            Imię i nazwisko (niepoprawne) - minimalna ilość znaków w polu to 3
            </label>;
        }
    }

    getInputCssClasses(stateIsValid){
        let inputCssClasses = ["form-control"];

        if(stateIsValid === true){
            inputCssClasses.push('input-valid')
        }
        else if(stateIsValid === false
            ||  stateIsValid === null && this.state.isRegisterBtnClicked){
            inputCssClasses.push('input-invalid')
        }

        return inputCssClasses;
    }

    render() {
        let emailCssClasses = this.getInputCssClasses(this.state.isEmailValid);
        let passwordCssClasses = this.getInputCssClasses(this.state.isPasswordValid);
        let passwordConfirmationCssClasses = this.getInputCssClasses(this.state.isPasswordConfirmationValid);
        let nameCssClassess = this.getInputCssClasses(this.state.isNameValid);

        return (
            <form>
                <div className="form-group">
                    {this.getEmailLabel()}
                    <input className={emailCssClasses.join(' ')} value={this.state.email} onChange={this.handleOnInputChange} type="email" id={this.state._emailId}/>
                </div>
                <div className="form-group">
                    {this.getPasswordLabel()}
                    <input className={passwordCssClasses.join(' ')}  value={this.state.password} onChange={this.handleOnInputChange} type="password" id={this.state._passwordId} />
                </div>
                <div className="form-group">
                    {this.getPasswordConfirmationLabel()}
                    <input className={passwordConfirmationCssClasses.join(' ')} value={this.state.passwordConfirmation} onChange={this.handleOnInputChange} type="password" id={this.state._passwordConfirmationId} />
                </div>
                <div className="form-group">
                    {this.getNameLabel()}
                    <input className={nameCssClassess.join(' ')}  value={this.state.name} onChange={this.handleOnInputChange} type="text" id={this.state._nameId} />
                </div>
                {this.generateInputForPlanner()}
            </form>
        );
    }
}

export default RegisterForm;