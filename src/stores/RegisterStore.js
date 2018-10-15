import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions"
import firebase from 'firebase';
import "firebase/auth";

let _email = "";
let _isRegisterBtnClicked = false;
let _password = "";
let _passwordConfirmation = "";
let _name = "";
let _companyName = "";
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
                _email = "";
                _password = "";
                _passwordConfirmation = "";
                _name = "";
                _companyName = "";
                break;
            }
            case AppConst.REGISTER_BTN_CLICKED: {
                _isRegisterBtnClicked = true;
                break;
            }
            case AppConst.REGISTER_USER: {
                if(_isRegisterBtnClicked === true){
                    let isFormValid = this.isFormValid(action.payload.isForPlanner);
                    
                    if(isFormValid){
                        // alert("tutaj nastapi rejestracja");
                        let user = null;
                        firebase.auth().createUserWithEmailAndPassword(_email, _password)
                        .then(function(firebaseUser){
                            console.log("firebaseUser", firebaseUser);
                            // console.log("User " + firebaseUser + " created successfully!");
                            user = firebaseUser.user;


                            // let ref = firebase.database().ref().child("users");
                            // let data = {
                            //     id: firebaseUser.uid,
                            //     email: _email,
                            //     password: _password,
                            //     name: _name,
                            // }

                            // let ref = firebase.database().ref();
                            // console.log("ref", ref);
                            // let usersRef = ref.child('users');
                            // console.log("usersRef", usersRef);
                            // let userRef = usersRef.set(firebaseUser.user.uid);
                            // console.log("userRef", userRef);
                            // usersRef.child(firebaseUser.user.uid).set({
                            //     id: data.id,
                            //     email: data.email,
                            //     password: data.password,
                            //     name: data.password
                            // });
                            // console.log("userWithData", userWithData);


                            // let userRef = usersRef.push(firebaseUser.user.uid);
                            // console.log("userRef", userRef);
                            // let userWithData = userRef.push({
                            //     id: data.id,
                            //     email: data.email,
                            //     password: data.password,
                            //     name: data.password
                            // });
                            // console.log("userWithData", userWithData);




                            // let ref = firebase.database().ref("users/" + firebaseUser.user.uid)
                            // .set(data)
                            // .then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                            //     console.log("Saved");
                            //     firebase.auth().onAuthStateChanged(function(user) {
                            //         user.sendEmailVerification(); 
                            //       });
                            // }, function(error) {
                            //     console.log(error); 
                            // });



                            // ref.child(user.uid).set(data)
                            // .then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                            //     console.log("Saved");
                            //     firebase.auth().onAuthStateChanged(function(user) {
                            //         user.sendEmailVerification(); 
                            //       });
                            // }, function(error) {
                            //     console.log(error); 
                            // });

                            // return firebaseUser;
                        })
                        .then(function(){
                            let userForUpdate = firebase.auth().currentUser;
                            userForUpdate.updateProfile({
                                displayName: _name,
                              }).then(function() {
                                // Update successful.
                              }).catch(function(error) {
                                // An error happened.
                              });
                        })
                        .then(function(){
                            //console.log("beforeIf", user);
                            if(user !== null){
                                //console.log("beforeSet", user);
                                firebase.database().ref('users/' + user.uid).set({
                                    id: user.uid,
                                    email: _email,
                                    password: _password,
                                    name: _name
                                }).then(function(){
                                    //console.log("beforeSend", user);
                                    user.sendEmailVerification(); 
                                });
                            }
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // ...
                          });

                        // firebase.auth().onAuthStateChanged(function(user) {
                        //     let ref = firebase.database().ref();
                        //     console.log("ref", ref);
                        //     let usersRef = ref.child('users');
                        //     console.log("user", user);
                        //     let userRef = usersRef.set(user.uid);
                        //     console.log("userRef", userRef);
                        //     firebase.database().ref('users/' + user.uid).set({
                        //         id: user.uid,
                        //         email: _email,
                        //         password: _password,
                        //         name: _name
                        //     });
                        //     console.log("beforeSend", user);
                        //     user.sendEmailVerification(); 
                        // });
                    }
                    else{
                        alert("nie ma rejestracji w formsach jest update kolorkow");
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