import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import VisitTypeFunctions from "../utils/VisitTypeFunctions";
import _ from 'underscore';

let _id = null;
let _name = "";
let _description = "";
// let _availableTimeUnits = [
//     "15 min",
//     "30 min",
//     "45 min",
//     "1 godz.",
//     "1,5 godz.",
//     "2 godz."
// ];
let _availableTimeUnits = [
    15,
    30,
    45,
    60,
    90,
    120
];
let _timeCost = _availableTimeUnits[0];
let _moneyCost = 0.01;
let _isNew = null;
let _isEdit = null;
let _isRead = null;
let _selectedVisitType = {};
let _visitTypes = [];
let _dailyPlanSelectedVisitTypes = [];
const ALL = "all";

class VisitTypeStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.VISIT_TYPE_SET_ID: {
                _id = action.payload.id;
                break;
            }
            case AppConst.VISIT_TYPE_SET_NAME: {
                _name = action.payload.name;
                break;
            }
            case AppConst.VISIT_TYPE_SET_DESCRIPTION: {
                _description = action.payload.description;
                break;
            }
            case AppConst.VISIT_TYPE_SET_TIME_COST: {
                _timeCost = action.payload.timeCost;
                break;
            }
            case AppConst.VISIT_TYPE_SET_MONEY_COST: {
                _moneyCost = action.payload.moneyCost;
                break;
            }
            case AppConst.VISIT_TYPE_CLEAR_DATA: {
                _id = null;
                _name = "";
                _description = "";
                _timeCost = _availableTimeUnits[0];
                _moneyCost = 0.01;
                break;
            }
            case AppConst.VISIT_TYPE_CREATOR_EDIT_BTN_CLICKED: {
                _isEdit = true;
                _isNew = false;
                _isRead = false;
                break;      
            }
            case AppConst.VISIT_TYPE_CREATOR_CLOSE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;      
            }
            case AppConst.VISIT_TYPE_CREATOR_SAVE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;      
            }
            case AppConst.VISIT_TYPE_SET_SELECTED_VISIT_TYPE: {
                let selectedVisitTypeId = action.payload.selectedVisitTypeId;

                _selectedVisitType = _visitTypes.find(function(visitType){
                    return visitType.id === selectedVisitTypeId;
                });

                _id = _selectedVisitType.id;
                _name = _selectedVisitType.name;
                _description = _selectedVisitType.description;
                _timeCost = _selectedVisitType.timeCost;
                _moneyCost = _selectedVisitType.moneyCost;

                
                _isRead = true;
                _isEdit = false;
                _isNew = false;
                break;
            }
            case AppConst.VISIT_TYPE_SET_VISIT_TYPES: {
                _visitTypes = [];
                _.each(action.payload.visitTypes, function(visitType){
                    _visitTypes.push(visitType);
                });
                break;
            }
            case AppConst.VISIT_TYPE_CREATOR_ADD_BTN_CLICKED: {
                _isEdit = false;
                _isNew = true; 
                _isRead = null;              
                break;
            }
            case AppConst.VISIT_TYPE_CREATOR_DELETE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = true;
                _isRead = null;
                break;      
            }
            case AppConst.DAILY_PLAN_SET_SELECTED_AVAILABLE_VISIT_TYPES: {
                _dailyPlanSelectedVisitTypes = [];
                _.each(action.payload.selectedVisitTypeIds, function(selectedVisitTypeId){
                    let selectedVisitType = _visitTypes.find(function(visitType){
                        return visitType.id === selectedVisitTypeId;
                    });
                    
                    _dailyPlanSelectedVisitTypes.push(selectedVisitType);
                });
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

    getId(){
        return _id;
    }

    getName(){
        return _name;
    }

    getDescription(){
        return _description;
    }

    getTimeCost(){
        return _timeCost;
    }

    getAvailableTimeUnits(){
        return _availableTimeUnits;
    }

    getMoneyCost(){
        return _moneyCost;
    }

    isEdit(){
        return _isEdit;
    }

    isNew(){
        return _isNew;
    }

    isRead(){
        return _isRead;
    }

    getSelectedVisitType(){
        return _selectedVisitType;
    }

    getVisitTypes(){
        return _visitTypes;
    }

    getDailyPlanSelectedVisitTypes(){
        return _dailyPlanSelectedVisitTypes;
    }

    isFormValid(){
        if(!RegisterFunctions.isStringBlank(_name) && !RegisterFunctions.isStringBlank(_description) 
        && !isNaN(_moneyCost) && VisitTypeFunctions.isTimeCostCorrect(_timeCost)
        && ((_isEdit === true && !RegisterFunctions.isStringBlank(_id)) || (_isEdit === null || _isEdit === false))){
            return true;
        }

        return false;
    }
}

export default new VisitTypeStore();