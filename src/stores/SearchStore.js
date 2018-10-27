import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";

let _nameCompanyName = "";
let _specialits = []; 
let _city = "Wrocław";
let _cities = [];
const ALL = "all";

class SearchStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.SET_NAME_COMPANY_NAME: {
                _nameCompanyName = action.payload.value;
                break;
            }
            case AppConst.SET_CITY: {
                _city = action.payload.value;
                break;
            }
            case AppConst.SEARCH_SPECIALISTS: {
                _specialits = action.payload.specialists;
                break;
            }
            case AppConst.SEARCH_CITIES: {
                _cities = action.payload.cities;
                break;
            }
            case AppConst.CLEAR_SPECIALISTS_SEARCH:{
                _nameCompanyName = "";
                _specialits = [];
            }
            case AppConst.CLEAR_CITIES_SEARCH:{
                _city = "";
                _cities = [];
            }
            case AppConst.CLEAR_SEARCH:{
                _nameCompanyName = "";
                _specialits = [];
                _city = "";
                _cities = [];
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

    getNameCompanyName(){
        return _nameCompanyName;
    }

    getSpecialists(){
        return _specialits;
    }

    getCity(){
        return _city;
    }

    getCities(){
        return _cities;
    }
}

export default new SearchStore();