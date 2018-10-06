// import { EventEmitter } from "events";
// import AppDispatcher from "../dispatcher/AppDispatcher";
// import AppConst from "../constants/AppConst";

// let _hours = null;
// const ALL = "all";

// class CalendarGridColumnHoursStore extends EventEmitter {
//     constructor() {
//         super();
//         this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
//     }

//     dispatcherCallback(action){
//         switch(action.actionType) {
//             case AppConst.SELECT_WHOLE_WEEK_BY_DAY_IN_CALENDAR: {
//                 this.setSelectedDate(action.payload.selectedDate);
//                 this.setHighlightedDates(action.payload.selectedDate);
//                 break;
//             }
//           }

//         this.emitChange(ALL);
//         return true;
//     }

//     emitChange(eventName){
//         this.emit(eventName);
//     }

//     addChangeListener(callback){
//         this.on(ALL, callback);
//     }

//     removeChangeListener(callback){
//         this.removeListener(ALL, callback);
//     }

//     getHours(){
//         return _hours;
//     }

//     setHours(hours){
//         _hours = hours;
//     }

// }

// export default new CalendarGridColumnHoursStore();