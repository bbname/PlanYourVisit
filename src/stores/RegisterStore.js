import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";

let _email = "";
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
                _email = "";
                _password = "";
                _passwordConfirmation = "";
                _name = "";
                _companyName = "";
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

    getEmail(){
        return _email;
    }

    getPassword(){
        return _password;
    }

    getPasswordConfirmation(){
        return _passwordConfirmation;
    }

    getName(){
        return _name;
    }

    getCompanyName(){
        return _companyName;
    }
}

export default new RegisterStore();