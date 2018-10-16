import React from 'react';
import LoginStore from "../../stores/LoginStore"
import LoginActionCreator from "../../actions/LoginActionCreator"

class LoginForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoginBtnClicked: LoginStore.isLoginBtnClicked(),
            isForgetPasswordBtnClicked: LoginStore.isForgetPasswordBtnClicked(),
            email: LoginStore.getEmail(),
            isEmailValid: LoginStore.isEmailValid(),
            isEmailFilled: LoginStore.isEmailFilled(),
            password: LoginStore.getPassword(),
            isPasswordFilled: LoginStore.isPasswordFilled(),
            isForgetPassword: LoginStore.isForgetPassword()
        }

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        LoginStore.addChangeListener(this._onChange);
    }
 
    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState({
            email : LoginStore.getEmail(),
            isEmailFilled: LoginStore.isEmailFilled(),
            isEmailValid: LoginStore.isEmailValid(),
            password: LoginStore.getPassword(),
            isPasswordFilled: LoginStore.isPasswordFilled(),
            isLoginBtnClicked: LoginStore.isLoginBtnClicked(),
            isForgetPasswordBtnClicked: LoginStore.isForgetPasswordBtnClicked(),
            isForgetPassword: LoginStore.isForgetPassword()
        })
    }

    handleOnInputChange = (e) =>{
        if(e.target.id === "email-login"){
            LoginActionCreator.setEmail(e.target.value);
        }
        else if(e.target.id === "password-login"){
            LoginActionCreator.setPassword(e.target.value);
        }
    }

    getEmailLabel(){
        if(!this.state.isEmailFilled && (this.state.isLoginBtnClicked || this.state.isForgetPasswordBtnClicked)){
            return <label htmlFor="email" className="col-form-label label-invalid">E-mail (nieuzupełniony):</label>;
        }
        else if(this.state.isForgetPassword){
            if(this.state.isEmailValid === null){
                return <label htmlFor="email" className="col-form-label">E-mail:</label>;
            }
            else if(this.state.isEmailValid === true){
                return <label htmlFor="email" className="col-form-label label-valid">E-mail (poprawny):</label>;
            }
            else if(this.state.isEmailValid === false){
                return <label htmlFor="email" className="col-form-label label-invalid">E-mail (niepoprawny):</label>;
            }
        }
        else{
            return <label htmlFor="email" className="col-form-label">E-mail:</label>;
        }
    }

    getPasswordLabel(){
        if(!this.state.isForgetPassword){
            if(!this.state.isPasswordFilled && this.state.isLoginBtnClicked){
                return <label htmlFor="password" className="col-form-label label-invalid">Hasło (nieuzupełnione):</label>;
            }
            else{
                return <label htmlFor="password" className="col-form-label">Hasło:</label>;
            }
        }
    }

    getInputCssClasses(inputFill, inputValid){
        if(inputValid === null){
            let inputCssClasses = ["form-control"];
        
            if(!inputFill && (this.state.isLoginBtnClicked || this.state.isForgetPasswordBtnClicked)){
                inputCssClasses.push('input-invalid')
            }
    
            return inputCssClasses;
        }
        else{
            let inputCssClasses = ["form-control"];

            if(this.state.isForgetPassword && inputFill && inputValid === true){
                inputCssClasses.push('input-valid')
            }
            else if(this.state.isForgetPassword && inputFill && 
                (inputValid === false || (inputValid === null && this.state.isForgetPasswordBtnClicked))){
                inputCssClasses.push('input-invalid')
            }
    
            return inputCssClasses;
        }
    }

    generatePasswordInput(){
        if(!this.state.isForgetPassword){
            let passwordCssClasses = this.getInputCssClasses(this.state.isPasswordFilled, null);
            return (
                <div className="form-group">
                    {this.getPasswordLabel()}
                    <input className={passwordCssClasses.join(' ')} value={this.state.password} onChange={this.handleOnInputChange} type="password" id="password-login" />
                </div>
            );
        }
    }

    render() {
        let emailCssClasses = this.getInputCssClasses(this.state.isEmailFilled, this.state.isEmailValid);
        
        return (
            <form>
                <div className="form-group">
                    {this.getEmailLabel()}
                    <input className={emailCssClasses.join(' ')} value={this.state.email} onChange={this.handleOnInputChange} type="email"  id="email-login"/>
                </div>
                {this.generatePasswordInput()}
            </form>
        );
    }
}

export default LoginForm;