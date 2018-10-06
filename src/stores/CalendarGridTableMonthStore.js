import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import CalendarFunctions from "../utils/CalendarFunctions"
import moment from 'moment';

let _selectedDate = null;
let _plannerId = null;
let _previousWeekDaysHours = [];
let _currentWeekDaysHours = [];
let _nextWeekDaysHours = [];
let _previousWeek = [];
let _currentWeek = [];
let _nextWeek = [];
let _isCurrentWeekFirstAvailableInMonth = false;
let _isCurrentWeekLastAvailableInMonth = false;
const ALL = "all";

class CalendarGridTableMonthStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.GET_PLANNER_CALENDAR:{
                this._plannerId = action.payload.plannerId;
            }
            case AppConst.SET_SELECTED_DATE: {
                this.setSelectedDate(action.payload.selectedDate);
                break;
            }
            case AppConst.SET_SELECTED_WEEK_DATES: {
                this.setHighlightedDates(action.payload.selectedDate);
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

    isCurrentWeekFirstAvailableInMonth(){
        return _isCurrentWeekFirstAvailableInMonth;
    }

    isCurrentWeekLastAvailableInMonth(){
        return _isCurrentWeekLastAvailableInMonth;
    }

    getSelectedDate(){
        return _selectedDate;
    }

    setSelectedDate(selectedDate){
        _selectedDate = selectedDate;
    }

    getPlannerId(){
        return _plannerId;
    }
}

export default new CalendarGridTableMonthStore();