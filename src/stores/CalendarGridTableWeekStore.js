import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";

let _plannerId = null;
let _selectedDate = null; 
let _monday = {};
let _tuesday = {};
// let _mondayDate = null;
// let _mondayHourObjs = null;
// let _mondaySlides = null;
// let _tuesdayDate = null;
// let _tuesdayHourObjs = null;
// let _tuesdaySlides = null;
let _wednesdayDate = null;
let _wednesdayHourObjs = null;
let _wednesdaySlides = null;
let _thursdayDate = null;
let _thursdayHourObjs = null;
let _thursdaySlides = null;
let _fridayDate = null;
let _fridayHourObjs = null;
let _fridaySlides = null;
// let _saturdayDate = null;
// let _saturdayHourObjs = null;
// let _saturdaySlides = null;
// let _sundayDate = null;
// let _sundayHourObjs = null;
// let _sundaySlides = null;
const ALL = "all";

class CalendarGridTableWeekStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.GET_PLANNER_CALENDAR: {
                this._plannerId = action.payload.plannerId
            }
            case AppConst.SET_CALENDAR_GRID_DATA: {
                this._monday.date = action.payload.mondayDate;
                this._monday.hourObjs = action.payload.mondayHourObjs;
                this._tuesday.date= action.payload.tuesdayDate;
                this._tuesday.hourObjs  = action.payload.tuesdayHourObjs;
                this._wednesdayDate = action.payload.wednesdayDate;
                this._wednesdayHourObjs = action.payload.wednesdayHourObjs;
                this._thursdayDate = action.payload.thursdayDate;
                this._thursdayHourObjs = action.payload.thursdayHourObjs;
                this._fridayDate = action.payload.fridayDate;
                this._fridayHourObjs = action.payload.fridayHourObjs;
            }
            // case AppConst.SET_HOURS_FOR_DAY: {
            //     this.setDate(action.payload.date);
            //     this.setHourObjs(action.payload.hourObjs);
            //     break;
            // }
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

    getSelectedDate(){
        return _selectedDate;
    }

    getMonday(){
        return _monday;
    }

    getTuesday(){
        return _tuesday;
    }

    getPlannerId(){
        return _plannerId;
    }
}

export default new CalendarGridTableWeekStore();