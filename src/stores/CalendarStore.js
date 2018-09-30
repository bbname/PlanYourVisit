import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import moment from 'moment';

let _selectedDate = moment();
let _minDate = getMinDate();
let _highlightedDates = getHighlightDates(_selectedDate);
const ALL = "all";

function getMinDate(){
    let currentDate = moment().locale('pl');
    let lastWeekBeforeCurrentDate = currentDate.subtract(7, "days");
    let lastWeekDayNr = lastWeekBeforeCurrentDate.day();
    // 0 nd
    // 1 pn
    // 6 sb
    const minDate = moment(lastWeekBeforeCurrentDate);
    if(lastWeekDayNr == 0){
        minDate.subtract(6, "days");
    }
    else{
        minDate.subtract(lastWeekDayNr-1, "days");
    }

    return minDate;
}

function getHighlightDates(selectedDate){
    let currentdayOfWeekNr = selectedDate.day();
    let startDayOfWeekNr = 1;
    let endDayOfWeekNr = 6;
    const datesToHighlight = [];
    // 0 nd
    // 1 pn
    // 6 sb

    if(currentdayOfWeekNr == 0){
        for(let i = 6; i > 0; i--){
            let test = moment(selectedDate);
            datesToHighlight.push(test.subtract(i, "days"));
        }
    }
    else{
        for(let i = startDayOfWeekNr; i <= endDayOfWeekNr+1; i++){
            let test = moment(selectedDate);
            if(i <= currentdayOfWeekNr){
                datesToHighlight.push(test.subtract(i-1, "days"));
            }
            else if(i > currentdayOfWeekNr){
                datesToHighlight.push(test.add(i-currentdayOfWeekNr, "days"));
            }
        }
    }

    return datesToHighlight;
}

class CalendarStore extends EventEmitter {
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
        _highlightedDates = getHighlightDates(selectedDate);
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

export default new CalendarStore();