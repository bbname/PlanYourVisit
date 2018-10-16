import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import firebase from 'firebase';
import "firebase/auth";

let _email = "";
let _isRegisterBtnClicked = false;
let _password = "";
let _passwordConfirmation = "";
let _name = "";
let _companyName = "";
let _isFormValid = null;
let _isRegistrationSuccessFull = null;
let _registrationErrorTitle = "Wystąpił nieoczekiwany błąd.";
let _registrationErrorMessage = "Przepraszamy za problemy. Prosimy o kontakt na adres email: planyourvisit.contact@gmail.com";
const ALL = "all";

class RegisterStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.SET_REGISTER_EMAIL: {
                _email = action.payload.email;
                break;
            }
            case AppConst.SET_REGISTER_PASSWORD: {
                _password = action.payload.password;
                break;
            }
            case AppConst.SET_REGISTER_PASSWORD_CONFIRMATION: {
                _passwordConfirmation = action.payload.passwordConfirmation;
                break;
            }
            case AppConst.SET_REGISTER_NAME: {
                _name = action.payload.name;
                break;
            }
            case AppConst.SET_REGISTER_COMPANY_NAME: {
                _companyName = action.payload.companyName;
                break;
            }
            case AppConst.CLEAR_REGISTER_DATA: {
                _isRegisterBtnClicked = false;
                _isFormValid = null;
                _isRegistrationSuccessFull = null;
                _email = "";
                _password = "";
                _passwordConfirmation = "";
                _name = "";
                _companyName = "";
                _registrationErrorTitle = "Wystąpił nieoczekiwany błąd.";
                _registrationErrorMessage = "Przepraszamy za problemy. Prosimy o kontakt na adres email: planyourvisit.contact@gmail.com";
                break;
            }
            case AppConst.REGISTER_BTN_CLICKED: {
                _isRegisterBtnClicked = true;
                break;
            }
            case AppConst.REGISTER_RUN_VALIDATION: {
                if(_isRegisterBtnClicked === true){
                    _isFormValid = this.isFormValid(action.payload.isForPlanner);    
                }       
                break;
            }
            case AppConst.CHECK_REGISTRATION_RESULT: {
                break;
            }
            case AppConst.REGISTER_USER: {
                if(_isRegisterBtnClicked === true){
                    let isFormValid = this.isFormValid(action.payload.isForPlanner);
                    
                    if(isFormValid){
                        let user = null;
                        let self = this;
                        firebase.auth().createUserWithEmailAndPassword(_email, _password).then(function(firebaseUser){
                            console.log("firebaseUser",firebaseUser);
                            user = firebaseUser.user;
                        }).then(function(){
                            firebase.auth().languageCode = 'pl';
                            let userForUpdate = firebase.auth().currentUser;
                            userForUpdate.updateProfile({
                                displayName: _name,
                              }).then(function() {
                                // Update successful.
                              }).catch(function(error) {
                                // An error happened.
                              });
                        }).then(function(){
                            if(user !== null){
                                firebase.database().ref('users/' + user.uid).set({
                                    id: user.uid,
                                    email: _email,
                                    password: _password,
                                    name: _name
                                }).then(function(){
                                    if(action.payload.isForPlanner){
                                        firebase.database().ref('planners/' + user.uid).set({
                                            id: user.uid,
                                            companyName: _companyName
                                        });
                                    }
                                    else{
                                        firebase.database().ref('visitors/' + user.uid).set({
                                            id: user.uid
                                        });
                                    }
                                }).then(function(){
                                    console.log("user", user);
                                    user.sendEmailVerification(); 
                                });

                                _isRegistrationSuccessFull = true;
                            }
                        }).catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            _isRegistrationSuccessFull = false;
                            if(errorCode === "auth/email-already-in-use"){
                                _registrationErrorTitle = "Podany adres e-mail jest już w użyciu.";
                                _registrationErrorMessage = "Podany przez Ciebie adres e-mail jest już używany przez kogoś innego.";
                            }
                            // ...
                          }).then(function(){
                              self.emitChange(ALL);
                          });
                    }
                }
            }
          }

        this.emitChange(ALL);
        return true;
    }

    emitChange(eventName){
        this.emit(eventName);
    }

    addChangeListener(callback){
        this.on(ALL, callback);
    }

    removeChangeListener(callback){
        this.removeListener(ALL, callback);
    }

    isRegisterBtnClicked(){
        return _isRegisterBtnClicked;
    }

    shouldShowSpinnerLoader(){
        return _isFormValid;
    }

    isRegistrationSuccessFull(){
        return _isRegistrationSuccessFull;
    }

    getRegistartionErrorTitle(){
        return _registrationErrorTitle;
    }
    
    getRegistartionErrorMessage(){
        return _registrationErrorMessage;
    }

    getEmail(){
        return _email;
    }

    isEmailValid(){
        if(RegisterFunctions.isStringBlank(_email)){
            return null;
        }

        return RegisterFunctions.isEmailValid(_email);
    }

    getPassword(){
        return _password;
    }

    isPasswordValid(){
        if(RegisterFunctions.isStringBlank(_password)){
            return null;
        }

        return RegisterFunctions.isPasswordValid(_password);
    }

    getPasswordErrorMessage(){
        if(this.isPasswordValid() === false){
            return RegisterFunctions.getPasswordError(_password);
        }

        return null;
    }

    getPasswordConfirmation(){
        return _passwordConfirmation;
    }

    isPasswordCofirmationValid(){
        if(!RegisterFunctions.isStringBlank(_password)){
            return RegisterFunctions.isPasswordCofirmationValid(_password, _passwordConfirmation);
        }
        else if(RegisterFunctions.isStringBlank(_password) && !RegisterFunctions.isStringBlank(_passwordConfirmation)){
            return false;
        }

        return null;
    }

    getName(){
        return _name;
    }

    isNameValid(){
        if(RegisterFunctions.isStringBlank(_name)){
            return null;
        }
        else if(_name.trim().length < 3){
            return false;
        }

        return true;
    }

    getCompanyName(){
        return _companyName;
    }

    isCompanyNameValid(){
        if(RegisterFunctions.isStringBlank(_companyName)){
            return null;
        }
        else if(_companyName.trim().length < 3){
            return false;
        }

        return true;
    }

    isFormValid(isForPlanner){
        if(this.isEmailValid() === true
        && this.isPasswordValid() === true
        && this.isPasswordCofirmationValid() === true
        && this.isNameValid() === true){
            if(isForPlanner === true && this.isCompanyNameValid() === true){
                return true;
            }
            else if(isForPlanner === true && 
                (this.isCompanyNameValid() === null || this.isCompanyNameValid() === false)){
                return false;
            }
            else{
                return true;
            }
        }
    }
    
}

export default new RegisterStore();