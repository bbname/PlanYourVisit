import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import firebase from 'firebase';
import "firebase/auth";
import CalendarFunctions from "../utils/CalendarFunctions";
import VisitorFunctions from "../utils/VisitorFunctions";
import Visitor from "../dataProcessor/Visitor";
import CalendarGridActionCreator from "./CalendarGridActionCreator";
import _ from 'underscore';
import moment from 'moment';

class VisitorActionCreator {
    setReservedVisitsForPlanner(plannerId){
        if(plannerId !== null && plannerId !== undefined){
            Visitor.getReservedVisitsForPlanner(plannerId).then(function(visitDays){
                _.each(visitDays, function(visitDay){
                    _.each(visitDay.hours, function(hour){
                        hour = Visitor.getClientsForHours(hour)
                    });
                });

                setTimeout(() => {
                    AppDispatcher.dispatch({
                        actionType: AppConst.VISITS_SET_VISIT_DAYS_FOR_PLANNER_FROM_DATABASE,
                        payload: {
                            visitDays: visitDays
                        }
                    });
                }, 2500);
            });
        }
        else{
            firebase.auth().onAuthStateChanged(user => {
                if(user){
                    return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                        let user = snapshot.val();
                        return user;
                      }).then(function(userFromDb){
                          if(userFromDb.isPlanner){
                            Visitor.getReservedVisitsForPlanner(userFromDb.id).then(function(visitDays){
                                _.each(visitDays, function(visitDay){
                                    _.each(visitDay.hours, function(hour){
                                        hour = Visitor.getClientsForHours(hour)
                                    });
                                });

                                setTimeout(() => {
                                    AppDispatcher.dispatch({
                                        actionType: AppConst.VISITS_SET_VISIT_DAYS_FOR_PLANNER_FROM_DATABASE,
                                        payload: {
                                            visitDays: visitDays
                                        }
                                    });
                                }, 2500);
                            });
                          }
                      });
                }
            });
        }
    };
    setReservedVisits(userId){
        if(userId !== null){
            Visitor.getReservedVisits(userId).then(function(visitDays){
                AppDispatcher.dispatch({
                    actionType: AppConst.VISITS_SET_VISIT_DAYS_FROM_DATABASE,
                    payload: {
                        visitDays: visitDays
                    }
                });
            });
        }
    };
    confirmVisit(userId, plannerId, visitDate){
        let self = this;

        if(userId !== null && plannerId !== null){
            Visitor.confirmVisitReservation(userId, plannerId, visitDate).then(function(){
                self.setReservedVisits(userId);
            });
        }
    };
    cancelVisit(userId, plannerId, visitDate){
        let self = this;

        if(userId !== null && plannerId !== null){
            Visitor.cancelVisitReservation(userId, plannerId, visitDate).then(function(){
                self.setReservedVisits(userId);
            });
        }
    };
    deleteVisitForVisitor(userId, plannerId, visitDate){
        let self = this;

        if(userId !== null && plannerId !== null){
            Visitor.deleteVisitForVisitor(userId, plannerId, visitDate).then(function(){
                self.setReservedVisits(userId);
            });
        }
    };
    deleteVisitForPlanner(plannerId, clientId, visitDate){
        let self = this;

        if(clientId !== null && plannerId !== null){
            Visitor.deleteVisitForPlanner(plannerId, clientId, visitDate).then(function(){
                self.setReservedVisitsForPlanner(plannerId);
            });
        }
    };
}

export default new VisitorActionCreator();