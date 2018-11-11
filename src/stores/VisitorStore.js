import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import VisitTypeFunctions from "../utils/VisitTypeFunctions";
import moment from 'moment';
import CalendarFunctions from "../utils/CalendarFunctions";
import VisitorFunctions from "../utils/VisitorFunctions";
import _ from 'underscore';

let _plannerId = null;
let _selectedVisit = {};
let _selectedVisitType = {};
let _availableVisitTypes = [];
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

class VisitorStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.VISITOR_SET_PLANNER_ID: {
                _plannerId = action.payload.plannerId;
                break;
            }
            case AppConst.VISITOR_SET_SELECTED_VISIT_DATE: {
                _selectedVisit.date = action.payload.date;
                break;
            }
            case AppConst.VISITOR_SET_SELECTED_VISIT_DAY_WITH_HOURS: {
                _selectedVisit.hours = [];
                _.each(action.payload.visitDay, function(hour){
                    hour.dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(hour.date);
                    _selectedVisit.hours.push(hour);
                });
                break;
            }
            case AppConst.VISITOR_SET_SELECTED_VISIT_TYPE: {
                let selectedVisitTypeId = action.payload.selectedVisitTypeId;              
                _selectedVisitType = _availableVisitTypes.find(function(visitType){
                    return visitType.id === selectedVisitTypeId;
                });
                break;
            }
            case AppConst.VISITOR_SET_AVAILABLE_VISIT_TYPES: {
                _availableVisitTypes = action.payload.availableVisitTypes;
                _selectedVisitType = _availableVisitTypes[0];
                // let availableVisitTypes = action.payload.availableVisitTypes;
                // _availableVisitTypes = VisitorFunctions.getAvailableVisitTypes(_selectedVisit.hours, _selectedVisit.date, availableVisitTypes);
                // let availableVisitTypes = action.payload.availableVisitTypes;
                // _availableVisitTypes = [];
                // _.each(availableVisitTypes, function(visitType){
                //     _availableVisitTypes.push(visitType);
                // });
                // _selectedVisitType = availableVisitTypes[Object.keys(availableVisitTypes)[0]];
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
            case AppConst.VISITOR_SET_VISIT_DAYS_FROM_DATABASE: {
                let visitDays = action.payload.visitDays;
                let self = this;
                //this.clearDaysData();
                _.each(visitDays, function(visitDay){
                    self.actionForDayByKeyDay("mon", function(day){
                        self.setVisitDay(day, visitDay);
                    });
                    self.actionForDayByKeyDay("tue", function(day){
                        self.setVisitDay(day, visitDay);
                    });
                    self.actionForDayByKeyDay("wed", function(day){
                        self.setVisitDay(day, visitDay);
                    });
                    self.actionForDayByKeyDay("thu", function(day){
                        self.setVisitDay(day, visitDay);
                    });
                    self.actionForDayByKeyDay("fri", function(day){
                        self.setVisitDay(day, visitDay);
                    });
                    self.actionForDayByKeyDay("sat", function(day){
                        self.setVisitDay(day, visitDay);
                    });
                    self.actionForDayByKeyDay("sun", function(day){
                        self.setVisitDay(day, visitDay);
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
            // case AppConst.PLANNER_CREATOR_EDIT_BTN_CLICKED: {
            //     _currentDayKey = action.payload.dayKey;
            //     _isEdit = true;
            //     _isNew = false;
            //     _isRead = false;
            //     break;      
            // }
            // case AppConst.PLANNER_CREATOR_CLOSE_BTN_CLICKED: {
            //     _isEdit = false;
            //     _isNew = false;
            //     _isRead = true;
            //     break;      
            // }
            // case AppConst.PLANNER_CREATOR_SAVE_BTN_CLICKED: {
            //     _isEdit = false;
            //     _isNew = false;
            //     _isRead = true;
            //     break;      
            // }
            // case AppConst.PLANNER_CREATOR_ADD_BTN_CLICKED: {
            //     _isEdit = false;
            //     _isNew = true; 
            //     _isRead = null;              
            //     break;
            // }
            // case AppConst.PLANNER_CREATOR_DELETE_BTN_CLICKED: {
            //     _isEdit = false;
            //     _isNew = true;
            //     _isRead = null;
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

    setVisitDay(day, visitDay){
        if(CalendarFunctions.getDateFormatForDatbase(day.date) === visitDay.date){
            day.visitDay = visitDay;
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

    getAvailableVisitTypes(){
        return _availableVisitTypes;
    }

    getSelectedVisitType(){
        return _selectedVisitType;
    }

    getSelectedVisit(){
        return _selectedVisit;
    }

    getPlannerId(){
        return _plannerId;
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

export default new VisitorStore();