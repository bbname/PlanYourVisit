import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";

let _user = null;
let _isPlanner = null;
const ALL = "all";

class UserStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.SIGN_IN_USER: {
                _user = action.payload.user;
                break;
            }
            case AppConst.SIGN_OUT_USER: {
                _user = null;
                _isPlanner = null;
                break;
            }
            case AppConst.IS_CURRENT_USER_PLANNER: {
                _isPlanner = action.payload.isPlanner;
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

    getUser(){
        return _user;
    }

    isPlanner(){
        return _isPlanner;
    }
}

export default new UserStore();