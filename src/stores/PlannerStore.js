import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import VisitTypeFunctions from "../utils/VisitTypeFunctions";
import moment from 'moment';
import CalendarFunctions from "../utils/CalendarFunctions";
import _ from 'underscore';

let _monday = {};
let _tuesday = {};
let _wednesday = {};
let _thursday = {};
let _friday = {};
let _saturday = {};
let _sunday = {};
let _currentDayKey = "";
let _isNew = null;
let _isEdit = null;
let _isRead = null;
const ALL = "all";

class PlannerStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.PLANNER_SET_DATES_FROM_CALENDAR: {
                _monday.date = action.payload.monday;
                _tuesday.date = action.payload.tuesday;
                _wednesday.date = action.payload.wednesday;
                _thursday.date = action.payload.thursday;
                _friday.date = action.payload.friday;
                _saturday.date = action.payload.saturday;
                _sunday.date = action.payload.sunday;
                break;
            }
            case AppConst.SET_SELECTED_WEEK_DATES: {
                let weekDates = CalendarFunctions.getWholeWeekBySelectedDate(action.payload.selectedDate);
                _monday.date = weekDates[0];
                _tuesday.date = weekDates[1];
                _wednesday.date = weekDates[2];
                _thursday.date = weekDates[3];
                _friday.date = weekDates[4];
                _saturday.date = weekDates[5];
                _sunday.date = weekDates[6];
                break;
            }
            case AppConst.PLANNER_SET_DAILY_PLANS: {
                _monday.dailyPlanId = action.payload.monday;
                _tuesday.dailyPlanId = action.payload.tuesday;
                _wednesday.dailyPlanId = action.payload.wednesday;
                _thursday.dailyPlanId = action.payload.thursday;
                _friday.dailyPlanId = action.payload.friday;
                _saturday.dailyPlanId = action.payload.saturday;
                _sunday.dailyPlanId = action.payload.sunday;

                if(_monday.plan || _tuesday.plan || _wednesday.plan || _thursday.plan || _friday.plan
                    || _saturday.plan || _sunday.plan){
                        _isRead = true;
                        _isEdit = false;
                        _isNew = false;
                    }
                else{
                    _isRead = false;
                    _isEdit = false;
                    _isNew = true;
                }
                break;
            }
            case AppConst.PLANNER_SET_DAILY_PLAN: {
                _currentDayKey = action.payload.dayKey;

                this.actionForDayByKeyDay(_currentDayKey, function(day){
                    day.dailyPlanId = action.payload.selectedDailyPlanId;
                });
                break;
            }

            case AppConst.PLANNER_SET_PLANS_FROM_DATABASE: {
                let dayPlans = action.payload.dayPlans;
                let self = this;
                this.clearDaysData();
                _.each(dayPlans, function(dayPlan){
                    // dayPlan.date = CalendarFunctions.getDateMomentObjFromDatabaseFormat(dayPlan.date);

                    self.actionForDayByKeyDay("mon", function(day){
                        self.setDay(day, dayPlan);
                    });
                    self.actionForDayByKeyDay("tue", function(day){
                        self.setDay(day, dayPlan);
                    });
                    self.actionForDayByKeyDay("wed", function(day){
                        self.setDay(day, dayPlan);
                    });
                    self.actionForDayByKeyDay("thu", function(day){
                        self.setDay(day, dayPlan);
                    });
                    self.actionForDayByKeyDay("fri", function(day){
                        self.setDay(day, dayPlan);
                    });
                    self.actionForDayByKeyDay("sat", function(day){
                        self.setDay(day, dayPlan);
                    });
                    self.actionForDayByKeyDay("sun", function(day){
                        self.setDay(day, dayPlan);
                    });
                });
                _currentDayKey = "";
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;
            }
            // case AppConst.TIME_RANGE_CLEAR_DATA: {
            //     _id = null;
            //     _timeFrom = null
            //     _timeTo = null;
            //     _timeStep = _availableTimeSteps[0];
            //     break;
            // }
            case AppConst.PLANNER_CREATOR_EDIT_BTN_CLICKED: {
                _currentDayKey = action.payload.dayKey;
                _isEdit = true;
                _isNew = false;
                _isRead = false;
                break;      
            }
            case AppConst.PLANNER_CREATOR_CLOSE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;      
            }
            case AppConst.PLANNER_CREATOR_SAVE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = false;
                _isRead = true;
                break;      
            }
            case AppConst.PLANNER_CREATOR_ADD_BTN_CLICKED: {
                _isEdit = false;
                _isNew = true; 
                _isRead = null;              
                break;
            }
            case AppConst.PLANNER_CREATOR_DELETE_BTN_CLICKED: {
                _isEdit = false;
                _isNew = true;
                _isRead = null;
                break;      
            }
            // case AppConst.TIME_RANGE_SET_SELECTED_TIME_RANGE: {
            //     let selectedTimeRangeId = action.payload.selectedTimeRangeId;

            //     _selectedTimeRange = _timeRanges.find(function(timeRange){
            //         return timeRange.id === selectedTimeRangeId;
            //     });

            //     _id = _selectedTimeRange.id;
            //     _timeFrom = moment(_selectedTimeRange.timeFrom, "HH:mm");
            //     _timeTo = moment(_selectedTimeRange.timeTo, "HH:mm");
            //     _timeStep = _selectedTimeRange.timeStep;
                
            //     _isRead = true;
            //     _isEdit = false;
            //     _isNew = false;
            //     break;
            // }
            // case AppConst.TIME_RANGE_SET_TIME_RANGES: {
            //     _timeRanges = [];
            //     _.each(action.payload.timeRanges, function(timeRange){
            //         _timeRanges.push(timeRange);
            //     });
            //     break;
            // }
            // case AppConst.DAILY_PLAN_SET_SELECTED_AVAILABLE_TIME_RANGES: {
            //     _dailyPlanSelectedTimeRanges = [];
            //     _.each(action.payload.selectedTimeRangeIds, function(selectedTimeRangeId){
            //         let selectedTimeRange = _timeRanges.find(function(timeRange){
            //             return timeRange.id === selectedTimeRangeId;
            //         });
                    
            //         _dailyPlanSelectedTimeRanges.push(selectedTimeRange);
            //     });
            //     break;
            // }
          }

        this.emitChange(ALL);
        return true;
    }

    setDay(day, dayPlan){
        if(CalendarFunctions.getDateFormatForDatbase(day.date) === dayPlan.date){
            day.dailyPlanId = dayPlan.dailyPlanId;
            day.id = dayPlan.id;
            day.plannerId = dayPlan.plannerId;
        }
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

    getDay(dayKey){
        let searchedDay = {};
        
        this.actionForDayByKeyDay(dayKey, function(day){
            searchedDay = day;
        });

        return searchedDay;
    }

    getMonday(){
        return _monday;
    }
    
    getTuesday(){
        return _tuesday;
    }

    getWednesday(){
        return _wednesday;
    }

    getThursday(){
        return _thursday;
    }

    getFriday(){
        return _friday;
    }

    getSaturday(){
        return _saturday;
    }

    getSunday(){
        return _sunday;
    }

    getCurrentDayKey(){
        return _currentDayKey;
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

    actionForDayByKeyDay(keyDay, callback){
        switch (keyDay){
            case "mon": {
                callback(_monday);
                break;
            }
            case "tue": {
                callback(_tuesday);
                break;
            }
            case "wed": {
                callback(_wednesday);
                break;
            }
            case "thu": {
                callback(_thursday);
                break;
            }
            case "fri": {
                callback(_friday);
                break;
            }
            case "sat": {
                callback(_saturday);
                break;
            }
            case "sun": {
                callback(_sunday);
                break;
            }
        }
    }

    clearDaysData(){
        this.clearDayData(_monday);
        this.clearDayData(_tuesday);
        this.clearDayData(_wednesday);
        this.clearDayData(_thursday);
        this.clearDayData(_friday);
        this.clearDayData(_saturday);
        this.clearDayData(_sunday);
    }

    clearDayData(day){
        if(day.dailyPlanId !== undefined){
            delete day.dailyPlanId;
        }
        if(day.id !== undefined){
            delete day.id;
        }
        if(day.plannerId !== undefined){
            delete day.plannerId;
        }
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

export default new PlannerStore();