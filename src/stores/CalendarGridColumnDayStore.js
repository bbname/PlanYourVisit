// import { EventEmitter } from "events";
// import AppDispatcher from "../dispatcher/AppDispatcher";
// import AppConst from "../constants/AppConst";

// let _plannerId = null;
// let _date = null;
// let _hourObjs = null;
// const ALL = "all";

// class CalendarGridColumnDayStore extends EventEmitter {
//     constructor() {
//         super();
//         this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
//     }

//     dispatcherCallback(action){
//         switch(action.actionType) {
//             case AppConst.GET_PLANNER_CALENDAR:{
//                 this._plannerId = action.payload.plannerId;
//             }
//             case AppConst.SET_HOURS_FOR_DAY: {
//                 this.setDate(action.payload.date);
//                 this.setHourObjs(action.payload.hourObjs);
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

//     getDate(){
//         return _date;
//     }

//     setDate(date){
//         _date = date;
//     }

//     getHourObjs(){
//         return _hourObjs;
//     }

//     setHourObjs(hourObjs){
//         _hourObjs = hourObjs;
//     }

//     getPlannerId(){
//         return _plannerId;
//     }
// }

// export default new CalendarGridColumnDayStore();