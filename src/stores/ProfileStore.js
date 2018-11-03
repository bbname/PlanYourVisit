import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import firebase from 'firebase';
import "firebase/auth";
import ProfileFunctions from '../utils/ProfileFunctions';

let _user = null;
let _isSaveBtnClicked = false;
let _isEditBtnClicked = false;
let _isCloseBtnClicked = false;
let _isForPlanner = null;
let _isFormValid = null;
let _isSaveSuccessFull = null;
let _email = "";
let _name = "";
let _companyName = "";
let _city = "";
let _address = "";
let _phone = "";
let _imageUrl = "";
let _emailPasswordProvider = "";
let _facebookProvider = "";
let _googleProvider = "";
let _saveErrorTitle = "Wystąpił nieoczekiwany błąd.";
let _saveErrorMessage = "Przepraszamy za problemy. Prosimy o kontakt na adres email: planyourvisit.contact@gmail.com";
const ALL = "all";

class ProfileStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.SET_PLANNER_PAGE_INFO: {
                let self = this;
                let planner = action.payload.planner;

                if(planner != null){
                    //_email = planner.email;
                    _name = planner.userName;
                    _city = planner.city;
                    _address = planner.address;
                    //_phone = planner.phone;
                    _imageUrl = planner.imageUrl;
                    _companyName = planner.companyName;

                    ProfileFunctions.getUserFromDatabase(planner.userId).then(function(user){
                        _email = user.email;
                        _phone = user.phone;
                        self.emitChange(ALL);
                    });

                    self.emitChange(ALL);
                }
                break;
            }
            case AppConst.SET_PROFILE_USER: {
                let self = this;
                let user = action.payload.user;

                if(user != null){
                    _user = user;
                    _email = user.email;
                    _name = user.name;
                    _city = user.city;
                    _address = user.address;
                    _phone = user.phone;
                    _imageUrl = user.imageUrl;
                    _isForPlanner = user.isPlanner;

                    if(user.isPlanner){
                        ProfileFunctions.getPlanner().then(function(planner){
                            _companyName = planner.companyName;
                            self.emitChange(ALL);
                        });
                    }


                    self.emitChange(ALL);
                }
                break;
            }
            case AppConst.SET_PROFILE_IMAGE: {
                _imageUrl = action.payload.imageUrl;
                break;
            }
            case AppConst.SET_PROFILE_CITY: {
                _city = action.payload.city;
                break;
            }
            case AppConst.SET_PROFILE_ADDRESS: {
                _address = action.payload.address;
                break;
            }
            case AppConst.SET_PROFILE_PHONE: {
                _phone = action.payload.phone;
                break;
            }
            case AppConst.SET_PROFILE_NAME: {
                _name = action.payload.name;
                break;
            }
            case AppConst.SET_PROFILE_COMPANY_NAME: {
                _companyName = action.payload.companyName;
                break;
            }
            case AppConst.CLEAR_PROFILE_DATA: {
                _name = "";
                _companyName = "";
                _city = "";
                _address = "";
                _phone = "";
                _isSaveBtnClicked = false;
                _isEditBtnClicked = null;
                _isCloseBtnClickled = false;
                _isFormValid = null;
                _isForPlanner = null;
                break;
            }
            case AppConst.EDIT_BTN_CLICKED: {
                _isEditBtnClicked = true;
                break;
            }
            case AppConst.CLOSE_BTN_CLICKED: {
                _isCloseBtnClicked = true;
                _isEditBtnClicked = false;
                break;
            }
            case AppConst.SAVE_BTN_CLICKED: {
                _isSaveBtnClicked = true;
                _isCloseBtnClicked = false;
                _isEditBtnClicked = false;

                if(this.isFormValid()){
                    let user = firebase.auth().currentUser;
                    let userRef = firebase.database().ref('/users/' + user.uid);

                    if(_isForPlanner){
                        userRef.update({
                            name: !RegisterFunctions.isStringBlank(_name) ? _name : "",
                            city: !RegisterFunctions.isStringBlank(_city) ? _city : "",
                            address: !RegisterFunctions.isStringBlank(_address) ? _address : "",
                            phone: !RegisterFunctions.isStringBlank(_phone) ? _phone : ""
                        }).then(function(){
                            let plannerRef = firebase.database().ref('/planners/' + user.uid);
                            plannerRef.update({
                                companyName: !RegisterFunctions.isStringBlank(_companyName) ? _companyName : "",
                                userName: !RegisterFunctions.isStringBlank(_name) ? _name : "",
                                city: !RegisterFunctions.isStringBlank(_city) ? _city : "",
                                address: !RegisterFunctions.isStringBlank(_address) ? _address : ""
                            });
                        });
                    }
                    else{
                        userRef.update({
                            name: !RegisterFunctions.isStringBlank(_name) ? _name : "",
                            city: !RegisterFunctions.isStringBlank(_city) ? _city : "",
                            address: !RegisterFunctions.isStringBlank(_address) ? _address : "",
                            phone: !RegisterFunctions.isStringBlank(_phone) ? _phone : ""
                        });
                    }
                }

                break;
            }
            case AppConst.UPDATE_USER: {
                _isSaveBtnClicked = true;
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

    isPlanner(){
        return _isForPlanner;
    }

    isEditBtnClicked(){
        return _isEditBtnClicked;
    }

    isCloseBtnClicked(){
        return _isCloseBtnClicked;
    }

    isSaveBtnClicked(){
        return _isSaveBtnClicked;
    }

    getUser(){
        return _user;
    }

    getEmail(){
        return _email;
    }

    getName(){
        return _name;
    }

    getCompanyName(){
        return _companyName;
    }

    getImageUrl(){
        return _imageUrl;
    }

    getCity(){
        return _city;
    }

    getAddress(){
        return _address;
    }

    getPhone(){
        return _phone;
    }

    isFormValid(){
        if((_isForPlanner && !RegisterFunctions.isStringBlank(_companyName) && !RegisterFunctions.isStringBlank(_name)) 
        || (!_isForPlanner && !RegisterFunctions.isStringBlank(_name))){
                return true;
        }

        return false;
    }

    // isFormValid(){
    //     if(!RegisterFunctions.isStringBlank(_address) && !RegisterFunctions.isStringBlank(_city) &&
    //        !RegisterFunctions.isStringBlank(_companyName) &&
    //        !RegisterFunctions.isStringBlank(_name) && !RegisterFunctions.isStringBlank(_phone)){
    //            return true;
    //     }

    //     return false;
    // }
}

export default new ProfileStore();