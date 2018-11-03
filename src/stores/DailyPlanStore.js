import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import VisitTypeFunctions from "../utils/VisitTypeFunctions";
import _ from 'underscore';

let _id = null;
let _name = "";
let _timeRanges = [];
let _visitTypes = [];
let _selectedTimeRanges = [];
let _selectedVisitTypes = [];
let _isNew = null;
let _isEdit = null;
let _isRead = null;
let _selectedDailyPlan = {};
let _dailyPlans = [];
const ALL = "all";

class DailyPlanStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.DAILY_PLAN_SET_ID: {
                _id = action.payload.id;
                break;
            }
            case AppConst.DAILY_PLAN_SET_NAME: {
                _name = action.payload.name;
                break;
            }
            case AppConst.DAILY_PLAN_SET_TIME_RANGES: {
                _.each(action.payload.timeRanges, function(timeRange){
                    timeRange.id = "daily-plan" + timeRange.id;

                    if(!_.any(_timeRanges, function(currentTimeRange){
                        return currentTimeRange.id === timeRange.id;
                    })){
                        _timeRanges.push(timeRange);
                    }
                });
                break;
            }
            case AppConst.DAILY_PLAN_SET_VISIT_TYPES: {
                _.each(action.payload.visitTypes, function(visitType){
                    visitType.id = "daily-plan" + visitType.id;

                    if(!_.any(_visitTypes, function(currentVisitType){
                        return currentVisitType.id === visitType.id;
                    })){
                        _visitTypes.push(visitType);
                    }
                });
                break;
            }
            case AppConst.DAILY_PLAN_CLEAR_DATA: {
                _id = null;
                _name = ""
                _timeRanges = [];
                _visitTypes = [];
                _selectedTimeRanges = [];
                _selectedVisitTypes = [];
                break;
            }
            case AppConst.DAILY_PLAN_CREATOR_EDIT_BTN_CLICKED: {
                _isEdit = true;
                _isNew = false;
                _isRead = false;
                break;      
            }
            case AppConst.DAILY_PLAN_CREATOR_CLOSE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;      
            }
            case AppConst.DAILY_PLAN_CREATOR_SAVE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;      
            }
            case AppConst.DAILY_PLAN_CREATOR_ADD_BTN_CLICKED: {
                _selectedDailyPlan = {};
                _isEdit = false;
                _isNew = true; 
                _isRead = null;              
                break;
            }
            case AppConst.DAILY_PLAN_CREATOR_DELETE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = true;
                _isRead = null;
                break;      
            }
            case AppConst.DAILY_PLAN_SET_SELECTED_DAILY_PLAN: {
                let selectedDailyPlanId = action.payload.selectedDailyPlanId;

                _selectedDailyPlan = _dailyPlans.find(function(dailyPlan){
                    return dailyPlan.id === selectedDailyPlanId;
                });

                _id = _selectedDailyPlan.id;
                _name = _selectedDailyPlan.name;
                _timeRanges = [];
                _.each(_selectedDailyPlan.timeRanges, function(timeRange){
                    _timeRanges.push(timeRange);
                });
                _visitTypes = [];
                _.each(_selectedDailyPlan.visitTypes, function(visitType){
                    _visitTypes.push(visitType);
                });
                
                _isRead = true;
                _isEdit = false;
                _isNew = false;
                break;
            }
            case AppConst.DAILY_PLAN_SET_DAILY_PLANS: {
                _dailyPlans = [];
                _.each(action.payload.dailyPlans, function(dailyPlan){
                    _dailyPlans.push(dailyPlan);
                });
                break;
            }
            case AppConst.DAILY_PLAN_SET_SELECTED_TIME_RANGES: {
                _selectedTimeRanges = [];
                _.each(action.payload.selectedTimeRangeIds, function(selectedTimeRangeId){
                    let selectedTimeRange = _timeRanges.find(function(timeRange){
                        return timeRange.id === selectedTimeRangeId;
                    });
                    
                    _selectedTimeRanges.push(selectedTimeRange);
                });
                break;
            }
            case AppConst.DAILY_PLAN_DELETE_SELECTED_TIME_RANGES: {
                _.each(_selectedTimeRanges, function(selectedTimeRange){
                    _timeRanges = _.reject(_timeRanges, function(timeRange){
                        return timeRange.id === selectedTimeRange.id;
                    })
                });
                break;
            }
            case AppConst.DAILY_PLAN_SET_SELECTED_VISIT_TYPES: {
                _selectedVisitTypes = [];
                _.each(action.payload.selectedVisitTypeIds, function(selectedVisitTypeId){
                    let selectedVisitType = _visitTypes.find(function(visitType){
                        return visitType.id === selectedVisitTypeId;
                    });
                    
                    _selectedVisitTypes.push(selectedVisitType);
                });
                break;
            }
            case AppConst.DAILY_PLAN_DELETE_SELECTED_VISIT_TYPE: {
                _.each(_selectedVisitTypes, function(selectedVisitType){
                    _visitTypes = _.reject(_visitTypes, function(visitType){
                        return visitType.id === selectedVisitType.id;
                    })
                });
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

    getTimeRanges(){
        return _timeRanges;
    }

    getSelectedTimeRanges(){
        return _selectedTimeRanges;
    }

    getVisitTypes(){
        return _visitTypes;
    }

    getSelectedVisitTypes(){
        return _selectedVisitTypes;
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

    getSelectedDailyPlan(){
        return _selectedDailyPlan;
    }

    getDailyPlans(){
        return _dailyPlans;
    }

    isFormValid(){
        // if(!RegisterFunctions.isStringBlank(_timeFrom) && !RegisterFunctions.isStringBlank(_timeTo) 
        // && VisitTypeFunctions.isTimeCostCorrect(_timeStep)
        // && ((_isEdit === true && !RegisterFunctions.isStringBlank(_id)) || (_isEdit === null || _isEdit === false))){
        //     return true;
        // }

        // return false;
    }
}

export default new DailyPlanStore();