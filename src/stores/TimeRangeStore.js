import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import VisitTypeFunctions from "../utils/VisitTypeFunctions";
import moment from 'moment';
import _ from 'underscore';

let _id = null;
let _timeFrom = null;
let _timeTo = null;
let _availableTimeSteps = [
    15,
    30,
    45,
    60,
    90,
    120
];
let _timeStep = _availableTimeSteps[0];
let _isNew = null;
let _isEdit = null;
let _isRead = null;
let _selectedTimeRange = {};
let _timeRanges = [];
let _dailyPlanSelectedTimeRanges = [];
const ALL = "all";

class TimeRangeStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.TIME_RANGE_SET_ID: {
                _id = action.payload.id;
                break;
            }
            case AppConst.TIME_RANGE_SET_TIME_FROM: {
                _timeFrom = action.payload.timeFrom;
                break;
            }
            case AppConst.TIME_RANGE_SET_TIME_TO: {
                _timeTo = action.payload.timeTo;
                break;
            }
            case AppConst.TIME_RANGE_SET_TIME_STEP: {
                _timeStep = action.payload.timeStep;
                break;
            }
            case AppConst.TIME_RANGE_CLEAR_DATA: {
                _id = null;
                _timeFrom = null
                _timeTo = null;
                _timeStep = _availableTimeSteps[0];
                break;
            }
            case AppConst.TIME_RANGE_CREATOR_EDIT_BTN_CLICKED: {
                _isEdit = true;
                _isNew = false;
                _isRead = false;
                break;      
            }
            case AppConst.TIME_RANGE_CREATOR_CLOSE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;      
            }
            case AppConst.TIME_RANGE_CREATOR_SAVE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;      
            }
            case AppConst.TIME_RANGE_CREATOR_ADD_BTN_CLICKED: {
                _isEdit = false;
                _isNew = true; 
                _isRead = null;              
                break;
            }
            case AppConst.TIME_RANGE_CREATOR_DELETE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = true;
                _isRead = null;
                break;      
            }
            case AppConst.TIME_RANGE_SET_SELECTED_TIME_RANGE: {
                let selectedTimeRangeId = action.payload.selectedTimeRangeId;

                _selectedTimeRange = _timeRanges.find(function(timeRange){
                    return timeRange.id === selectedTimeRangeId;
                });

                _id = _selectedTimeRange.id;
                _timeFrom = moment(_selectedTimeRange.timeFrom, "HH:mm");
                _timeTo = moment(_selectedTimeRange.timeTo, "HH:mm");
                _timeStep = _selectedTimeRange.timeStep;
                
                _isRead = true;
                _isEdit = false;
                _isNew = false;
                break;
            }
            case AppConst.TIME_RANGE_SET_TIME_RANGES: {
                _timeRanges = [];
                _.each(action.payload.timeRanges, function(timeRange){
                    _timeRanges.push(timeRange);
                });
                break;
            }
            case AppConst.DAILY_PLAN_SET_SELECTED_AVAILABLE_TIME_RANGES: {
                _dailyPlanSelectedTimeRanges = [];
                _.each(action.payload.selectedTimeRangeIds, function(selectedTimeRangeId){
                    let selectedTimeRange = _timeRanges.find(function(timeRange){
                        return timeRange.id === selectedTimeRangeId;
                    });
                    
                    _dailyPlanSelectedTimeRanges.push(selectedTimeRange);
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

    getTimeTo(){
        return _timeTo;
    }

    getTimeFrom(){
        return _timeFrom;
    }

    getTimeStep(){
        return _timeStep;
    }

    getAvailableTimeSteps(){
        return _availableTimeSteps;
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

    getSelectedTimeRange(){
        return _selectedTimeRange;
    }

    getTimeRanges(){
        return _timeRanges;
    }

    getDailyPlanSelectedTimeRanges(){
        return _dailyPlanSelectedTimeRanges;
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

export default new TimeRangeStore();