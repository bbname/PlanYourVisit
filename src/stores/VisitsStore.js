import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConst from "../constants/AppConst";
import RegisterFunctions from "../utils/RegisterFunctions";
import VisitTypeFunctions from "../utils/VisitTypeFunctions";
import moment from 'moment';
import CalendarFunctions from "../utils/CalendarFunctions";
import VisitorFunctions from "../utils/VisitorFunctions";
import _ from 'underscore';

let _visits = [];
const ALL = "all";

class VisitsStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action){
        switch(action.actionType) {
            case AppConst.VISITS_SET_VISIT_DAYS_FROM_DATABASE: {
                _visits = action.payload.visitDays;
                break;
            }
            case AppConst.VISITS_SET_VISIT_DAYS_FOR_PLANNER_FROM_DATABASE: {
                let visits = action.payload.visitDays;

                _.each(visits, function(visit){
                    _.each(visit.hours, function(hour){
                        let selectedVisitType = _.find(hour.availableVisitTypes, function(visitType){
                            return visitType.id === hour.selectedVisitTypeId;
                        });
                        hour.selectedVisitTypeName = selectedVisitType.name;
                    });
                });

                _visits = visits;
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

    getVisits(){
        return _visits;
    }
}

export default new VisitsStore();