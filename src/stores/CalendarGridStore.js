import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import CalendarFunctions from "../utils/CalendarFunctions"
import moment from 'moment';
import _ from 'underscore';

let _monday = {};
let _tuesday = {};
let _wednesday = {};
let _thursday = {};
let _friday = {};
let _saturday = {};
let _sunday = {};
// let _mondaySlides = [];
// let _tuesdaySlides = [];
// let _wednesdaySlides = [];
// let _thursdaySlides = [];
// let _fridaySlides = [];
// let _saturdaySlides = [];
// let _sundaySlides = [];
let _mondaySlides = null;
let _tuesdaySlides = null;
let _wednesdaySlides = null;
let _thursdaySlides = null;
let _fridaySlides = null;
let _saturdaySlides = null;
let _sundaySlides = null;
let _isAnySlideLoaded = false;
const ALL = "all";

class CalendarGridStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
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
            case AppConst.PLANNER_SET_VISIT_DAYS_FROM_DATABASE: {
                let visitDays = action.payload.visitDays;
                let self = this;
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
                break;
            }
            case AppConst.SET_DAY_SLIDES: {
                let slideDays = action.payload.slideDays;
                let self = this;
                _.each(slideDays, function(slideDay){
                    self.actionForDayByKeyDay("mon", function(day){
                        self.setSlideDay(day, slideDay);
                    });
                    self.actionForDayByKeyDay("tue", function(day){
                        self.setSlideDay(day, slideDay);
                    });
                    self.actionForDayByKeyDay("wed", function(day){
                        self.setSlideDay(day, slideDay);
                    });
                    self.actionForDayByKeyDay("thu", function(day){
                        self.setSlideDay(day, slideDay);
                    });
                    self.actionForDayByKeyDay("fri", function(day){
                        self.setSlideDay(day, slideDay);
                    });
                    self.actionForDayByKeyDay("sat", function(day){
                        self.setSlideDay(day, slideDay);
                    });
                    self.actionForDayByKeyDay("sun", function(day){
                        self.setSlideDay(day, slideDay);
                    });
                    // self.actionForDaySlideByKeyDay("mon", function(day){
                    //     day = slideDay;
                    //     // self.setSlideDay(day, slideDay);
                    // });
                    // self.actionForDaySlideByKeyDay("tue", function(day){
                    //     self.setSlideDay(day, slideDay);
                    // });
                    // self.actionForDaySlideByKeyDay("wed", function(day){
                    //     self.setSlideDay(day, slideDay);
                    // });
                    // self.actionForDaySlideByKeyDay("thu", function(day){
                    //     self.setSlideDay(day, slideDay);
                    // });
                    // self.actionForDaySlideByKeyDay("fri", function(day){
                    //     self.setSlideDay(day, slideDay);
                    // });
                    // self.actionForDaySlideByKeyDay("sat", function(day){
                    //     self.setSlideDay(day, slideDay);
                    // });
                    // self.actionForDaySlideByKeyDay("sun", function(day){
                    //     self.setSlideDay(day, slideDay);
                    // });
                });
                _isAnySlideLoaded = true;
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

    isAnySlideLoaded(){
        return _isAnySlideLoaded;
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

    getMondaySlides(){
        return _mondaySlides;
    }
    
    getTuesdaySlides(){
        return _tuesdaySlides;
    }

    getWednesdaySlides(){
        return _wednesdaySlides;
    }

    getThursdaySlides(){
        return _thursdaySlides;
    }

    getFridaySlides(){
        return _fridaySlides;
    }

    getSaturdaySlides(){
        return _saturdaySlides;
    }

    getSundaySlides(){
        return _sundaySlides;
    }

    setSlideDay(day, slideDay){
        if(slideDay.length > 0){
            const date = slideDay[0].key.substring(0,10);
            if(CalendarFunctions.getDateFormatForDatbase(day.date) === date){
                day.slides = slideDay;
            }
        }
        // if(CalendarFunctions.getDateFormatForDatbase(day.date) === slideDay.key){
        //     day.slides = slideDay;
        // }
        // day = slideDay;
        // day.push(slideDay);
    }

    setVisitDay(day, visitDay){
        if(CalendarFunctions.getDateFormatForDatbase(day.date) === visitDay.date){
            day.visitDay = visitDay;
        }
    }

    actionForDaySlideByKeyDay(keyDay, callback){
        switch (keyDay){
            case "mon": {
                callback(_mondaySlides);
                break;
            }
            case "tue": {
                callback(_tuesdaySlides);
                break;
            }
            case "wed": {
                callback(_wednesdaySlides);
                break;
            }
            case "thu": {
                callback(_thursdaySlides);
                break;
            }
            case "fri": {
                callback(_fridaySlides);
                break;
            }
            case "sat": {
                callback(_saturdaySlides);
                break;
            }
            case "sun": {
                callback(_sundaySlides);
                break;
            }
        }
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

}

export default new CalendarGridStore();