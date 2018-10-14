import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";

let _email = "";
let _password = "";
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
}

export default new LoginStore();