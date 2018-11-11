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
    setPlannerId(plannerId){
        AppDispatcher.dispatch({
            actionType: AppConst.VISITOR_SET_PLANNER_ID,
            payload: {
                plannerId: plannerId
            }
        });
    };
    setSelectedVisitDate(date){
        AppDispatcher.dispatch({
            actionType: AppConst.VISITOR_SET_SELECTED_VISIT_DATE,
            payload: {
                date: date
            }
        });
    };
    setSelectedVisitDayWithHours(date, plannerId){
        let self = this;
        let day;

        if(date !== undefined && plannerId !== null){
            Visitor.getVisitDayWithHours(date, plannerId).then(function(visitDay){
                day = visitDay;
                AppDispatcher.dispatch({
                    actionType: AppConst.VISITOR_SET_SELECTED_VISIT_DAY_WITH_HOURS,
                    payload: {
                        visitDay: visitDay
                    }
                });
            }).then(function(){
                self.setAvailableVisitTypes(day, date, plannerId);
            });         
        }

    };
    setSelectedVisitType(visitTypeId){
        AppDispatcher.dispatch({
            actionType: AppConst.VISITOR_SET_SELECTED_VISIT_TYPE,
            payload: {
                selectedVisitTypeId: visitTypeId
            }
        });
    };
    setAvailableVisitTypes(visitDay, date, plannerId){
        let self = this;
        if(date !== undefined && plannerId !== null){
            let hours = [];
            _.each(visitDay, function(hour){
                hour.dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(hour.date);
                hours.push(hour);
            });

            Visitor.getAvailableVisitTypesForDate(date, plannerId).then(function(visitTypes){
                AppDispatcher.dispatch({
                    actionType: AppConst.VISITOR_SET_AVAILABLE_VISIT_TYPES,
                    payload: {
                        availableVisitTypes: self.getAvailableVisitTypes(hours, date, visitTypes)
                    }
                });
            });
        }
    };
    getAvailableVisitTypes(dayHours, stringSelectedDateWithHour, availableVisitTypes){
        let availableVisitTypesForSelectedHour = [];

        _.each(availableVisitTypes, function(visitType){
            let hour = dayHours.find(function(dayHour){
                return dayHour.date === stringSelectedDateWithHour;
            });

            let visitTimeCost = (visitType.timeCost - 1);
            let selectedHourIndex = _.findIndex(dayHours, hour);
            let currentHour = moment(dayHours[selectedHourIndex].dateObj);
            let lastElement = _.last(dayHours);

            if(hour === lastElement){
                availableVisitTypesForSelectedHour.push(visitType);
            }

            let forCheck = moment(currentHour);
            forCheck.add(visitTimeCost, 'minutes');

            for(let i = (selectedHourIndex+1); i < dayHours.length; i++){
                let nextHour = dayHours[i];

                if(forCheck.isAfter(nextHour.dateObj)){
                    if(nextHour.isReserved){
                        break;
                    }
                }
                else{
                    availableVisitTypesForSelectedHour.push(visitType);
                    break;
                }
            }
        });

        return availableVisitTypesForSelectedHour;
    }
    // setAvailableVisitTypes(date, plannerId){
    //     if(date !== undefined && plannerId !== null){
    //         Visitor.getAvailableVisitTypesForDate(date, plannerId).then(function(visitTypes){
    //             AppDispatcher.dispatch({
    //                 actionType: AppConst.VISITOR_SET_AVAILABLE_VISIT_TYPES,
    //                 payload: {
    //                     availableVisitTypes: visitTypes
    //                 }
    //             });
    //         });
    //     }
    // };
    setDatesFromCalendar(selectedDate){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_SELECTED_WEEK_DATES,
            payload: {
                selectedDate: selectedDate
            }
        });
    };
    setVisitsByDate(selectedDate, plannerId){
        let dates = CalendarFunctions.getWholeWeekBySelectedDate(selectedDate);
        let visitDaysForSlides = [];
        firebase.auth().onAuthStateChanged(user => {
            if(plannerId !== null){
                Visitor.getVisitDaysByDates(dates, plannerId).then(function(visitDays){
                    visitDaysForSlides = visitDays;
                    AppDispatcher.dispatch({
                        actionType: AppConst.VISITOR_SET_VISIT_DAYS_FROM_DATABASE,
                        payload: {
                            visitDays: visitDays
                        }
                    });
                }).then(function(){
                    CalendarGridActionCreator.setSlideDays(visitDaysForSlides, false);
                });
            }
        });
    };
    reserveVisit(plannerId, selectedVisit, selectedVisitType){
        let self = this;
        firebase.auth().onAuthStateChanged(user => {
            if(user !== undefined && plannerId !== null){
                Visitor.reserveVisit(user.uid, plannerId, selectedVisit, selectedVisitType).then(function(boolVal){
                    // AppDispatcher.dispatch({
                    //     actionType: AppConst.VISITOR_SET_VISIT_DAYS_FROM_DATABASE,
                    //     payload: {
                    //         x: x
                    //     }
                    // });
                }).then(function(){
                    self.closeReserveVisitModal();
                    let date = CalendarFunctions.getDateMomentObjFromDatabaseFormat(selectedVisit.date)
                    self.setVisitsByDate(date, plannerId);
                });
            }
        });
    };
    closeReserveVisitModal(){
        document.getElementById("close-reserve-visit-modal").click();
    };
    // closeBtnClicked(){
    //     AppDispatcher.dispatch({
    //         actionType: AppConst.PLANNER_CREATOR_CLOSE_BTN_CLICKED
    //     });
    // };
    // editBtnClicked(dayKey){
    //     AppDispatcher.dispatch({
    //         actionType: AppConst.PLANNER_CREATOR_EDIT_BTN_CLICKED,
    //         payload: {
    //             dayKey: dayKey
    //         }
    //     });
    // };
    // addBtnClicked(){
    //     // AppDispatcher.dispatch({
    //     //     actionType: AppConst.PLANNER_CLEAR_DATA
    //     // });
    //     AppDispatcher.dispatch({
    //         actionType: AppConst.PLANNER_CREATOR_ADD_BTN_CLICKED
    //     });
    // };
    // deleteBtnClicked(day){
    //     let self = this;

    //     Planner.deleteDailyPlanWithDate(day.id).then(function(boolVal){
    //         AppDispatcher.dispatch({
    //             actionType: AppConst.PLANNER_CREATOR_DELETE_BTN_CLICKED
    //         });
    //     }).then(function(){
    //         // AppDispatcher.dispatch({
    //         //     actionType: AppConst.PLANNER_CLEAR_DATA
    //         // });
    //     }).then(function(){
    //         self.setPlansByDate(day.date);
    //         self.setVisitsByDate(day.date);
    //     });
    // };
    // createBtnClicked(day){
    //     let user = firebase.auth().currentUser;
    //     let dayForDb = {
    //         dailyPlanId: day.dailyPlanId,
    //         date: day.date
    //     };
    //     let self = this;

    //     Planner.createDailyPlanWithDate(dayForDb, user.uid).then(function(boolVal){
    //         AppDispatcher.dispatch({
    //             actionType: AppConst.PLANNER_CREATOR_CREATE_BTN_CLICKED
    //         });
    //     }).then(function(){
    //         // AppDispatcher.dispatch({
    //         //     actionType: AppConst.PLANNER_CLEAR_DATA
    //         // });
    //     })
    //     .then(function(){
    //         self.setPlansByDate(day.date);
    //         self.setVisitsByDate(day.date);
    //     });
    // };
    // saveBtnClicked(day){
    //     let user = firebase.auth().currentUser;
    //     let dayForDb = {
    //         dailyPlanId: day.dailyPlanId,
    //         date: day.date,
    //         id: day.id,
    //         plannerId: day.plannerId
    //     };
    //     let self = this;

    //     Planner.saveDailyPlanWithDate(dayForDb, user.uid).then(function(boolVal){
    //         AppDispatcher.dispatch({
    //             actionType: AppConst.PLANNER_CREATOR_SAVE_BTN_CLICKED
    //         });
    //     }).then(function(){
    //         self.setPlansByDate(day.date);
    //         self.setVisitsByDate(day.date);
    //     });
    // }
}

export default new VisitorActionCreator();