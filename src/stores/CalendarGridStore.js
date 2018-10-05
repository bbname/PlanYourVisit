import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import CalendarFunctions from "../utils/CalendarFunctions"
import moment from 'moment';

let _selectedDate = moment();
let _minDate = CalendarFunctions.getMinDate();
let _highlightedDates = CalendarFunctions.getHighlightDates(_selectedDate);
const ALL = "all";

class CalendarGridStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.SELECT_WHOLE_WEEK_BY_DAY_IN_CALENDAR: {
                this.setSelectedDate(action.payload.selectedDate);
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

    // emitChange(eventName){
    //     this.emit(eventName);
    // }

    // addChangeListener(eventName, callback){
    //     this.on(eventName, callback);
    // }

    // removeChangeListener(eventName, callback){
    //     this.removeListener(eventName, callback);
    // }

    getHighlightedDates(){
        return _highlightedDates;
    }

    setHighlightedDates(selectedDate){
        _highlightedDates = CalendarFunctions.getHighlightDates(selectedDate);
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

    setMinDate(minDate){
        _minDate = minDate;
    }
}

export default new CalendarGridStore();