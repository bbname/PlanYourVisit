import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import CalendarFunctions from "../utils/CalendarFunctions"
import moment from 'moment';

let _selectedDate = moment();
let _plannerId = null;
let _minDate = CalendarFunctions.getMinDate();
let _maxDate = CalendarFunctions.getMaxDate();
let _highlightedDates = CalendarFunctions.getWholeWeekBySelectedDate(_selectedDate);
const ALL = "all";

class CalendarStore extends EventEmitter {
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

    getHighlightedDates(){
        return _highlightedDates;
    }

    setHighlightedDates(selectedDate){
        _highlightedDates = CalendarFunctions.getWholeWeekBySelectedDate(selectedDate);
    }

    getSelectedDate(){
        return _selectedDate;
    }

    setSelectedDate(selectedDate){
        _selectedDate = selectedDate;
    }

    getMinDate(){
        return _minDate;
    }

    getMaxDate(){
        return _maxDate;
    }

    getPlannerId(){
        return _plannerId;
    }
}

export default new CalendarStore();