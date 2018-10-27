import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import firebase from 'firebase';
import "firebase/auth";

let _email = "";
let _password = "";
let _isLoginBtnClicked = false;
let _isFormValid = null;
let _isLoginSuccessFull = null;
let _loginErrorTitle = "Wystąpił nieoczekiwany błąd.";
let _loginErrorMessage = "Przepraszamy za problemy. Prosimy o kontakt na adres email: planyourvisit.contact@gmail.com";
let _isForgetPassword = false;
let _isForgetPasswordBtnClicked = false;
let _isForgetPasswordSendSuccessFull = null;
let _forgetPasswordErrorTitle = "Wystąpił nieoczekiwany błąd.";
let _forgetPasswordErrorMessage = "Przepraszamy za problemy. Prosimy o kontakt na adres email: planyourvisit.contact@gmail.com";

const ALL = "all";

class LoginStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.SET_LOGIN_EMAIL: {
                _email = action.payload.email;
                break;
            }
            case AppConst.SET_LOGIN_PASSWORD: {
                _password = action.payload.password;
                break;
            }
            case AppConst.CLEAR_LOGIN_DATA: {
                _email = "";
                _password = "";
                _isForgetPassword = false;
                _isForgetPasswordSendSuccessFull = null;
                _isForgetPasswordBtnClicked = false;
                _isFormValid = null;
                _isLoginBtnClicked = false;
                _isLoginSuccessFull = null;
                _loginErrorTitle = "Wystąpił nieoczekiwany błąd.";
                _loginErrorMessage = "Przepraszamy za problemy. Prosimy o kontakt na adres email: planyourvisit.contact@gmail.com";
                _forgetPasswordErrorTitle = "Wystąpił nieoczekiwany błąd.";
                _forgetPasswordErrorMessage = "Przepraszamy za problemy. Prosimy o kontakt na adres email: planyourvisit.contact@gmail.com";
                break;
            }
            case AppConst.LOGIN_BTN_CLICKED: {
                _isLoginBtnClicked = true;
                break;
            }
            case AppConst.LOGIN_RUN_VALIDATION: {
                if(_isLoginBtnClicked === true){
                    _isFormValid = this.isFormValid();    
                }  
                else if(_isForgetPasswordBtnClicked === true){
                    _isFormValid = this.isEmailValid();
                }     
                break;
            }
            case AppConst.CHECK_LOGIN_RESULT: {
                break;
            }
            case AppConst.SHOW_FORGET_PASSWORD_MODAL: {
                _isForgetPassword = true;
                break;
            }
            case AppConst.FORGET_PASSWORD_BTN_CLICKED: {
                _isForgetPasswordBtnClicked = true;
                break;
            }
            case AppConst.RUN_FORGET_PASSWORD: {
                if(_isForgetPasswordBtnClicked === true){
                    let isEmailFilledValid = this.isEmailValid();
                    let self = this;
                    if(isEmailFilledValid === true){
                        firebase.auth().languageCode = 'pl';
                        firebase.auth().sendPasswordResetEmail(_email).then(function() {
                        // Email sent.
                        }).then(function(){
                            _isForgetPasswordSendSuccessFull = true; 
                        }).catch(function(error) {
                        // An error happened.
                        _isForgetPasswordSendSuccessFull = false;
                        if(error.code === "auth/user-not-found"){
                            _forgetPasswordErrorTitle = "Nie znaleziono użytkownika.";
                            _forgetPasswordErrorMessage = "Na podane przez Ciebie dane nie istnieje żaden użytkownik.";
                        }
                        }).then(function(){
                            self.emitChange(ALL);
                        });
                    }
                }
                break;
            }
            case AppConst.LOGIN_USER: {
                if(_isLoginBtnClicked === true){
                    let isFormValid = this.isFormValid();
                    if(isFormValid){
                        let user = null;
                        let self = this;
                        firebase.auth().signInWithEmailAndPassword(_email, _password).then(function(firebaseUser){
                            user = firebaseUser.user;
                            _isLoginSuccessFull = true;
                        }).catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            _isLoginSuccessFull = false;
                            if(errorCode === "auth/invalid-email"){
                                _loginErrorTitle = "Zły format adresu e-mail.";
                                _loginErrorMessage = "Podany przez Ciebie adres e-mail ma niepoprawny format.";
                            }
                            else if(errorCode === "auth/user-not-found"){
                                _loginErrorTitle = "Nie znaleziono użytkownika.";
                                _loginErrorMessage = "Na podane przez Ciebie dane nie istnieje żaden użytkownik.";
                            }
                            else if(errorCode === "auth/wrong-password"){
                                _loginErrorTitle = "Złe hasło.";
                                _loginErrorMessage = "Podane przez Ciebie hasło jest nieprawidłowe.";
                            }
                        }).then(function(){
                            self.emitChange(ALL);
                        });
                    }    
                }      
                break;
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

    isForgetPassword(){
        return _isForgetPassword; 
    }

    isForgetPasswordBtnClicked(){
        return _isForgetPasswordBtnClicked;
    }

    isForgetPasswordSendSuccessFull(){
        return _isForgetPasswordSendSuccessFull;
    }

    getForgetPasswordErrorTitle(){
        return _forgetPasswordErrorTitle;
    }

    getForgetPasswordErrorMessage(){
        return _forgetPasswordErrorMessage;
    }

    isLoginBtnClicked(){
        return _isLoginBtnClicked;
    }

    shouldShowSpinnerLoader(){
        return _isFormValid;
    }

    isLoginSuccessFull(){
        return _isLoginSuccessFull;
    }

    getLoginErrorTitle(){
        return _loginErrorTitle;
    }
    
    getLoginErrorMessage(){
        return _loginErrorMessage;
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

    isEmailFilled(){
       return !RegisterFunctions.isStringBlank(_email);
    }

    getPassword(){
        return _password;
    }

    isPasswordFilled(){
        return !RegisterFunctions.isStringBlank(_password);
     }

    isFormValid(){
        if(this.isEmailFilled() === true
        && this.isPasswordFilled() === true){
            return true;
        }
        else {
            return false;
        }
    }
}

export default new LoginStore();