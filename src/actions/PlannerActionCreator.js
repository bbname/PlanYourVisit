import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import firebase from 'firebase';
import "firebase/auth";
import CalendarFunctions from "../utils/CalendarFunctions";
import Planner from "../dataProcessor/Planner";
import CalendarGridActionCreator from "./CalendarGridActionCreator";

class PlannerActionCreator {
    // setDatesFromCalendar(monday, tuesday, wednesday, thursday, friday, saturday, sunday){
    //     AppDispatcher.dispatch({
    //         actionType: AppConst.PLANNER_SET_DATES_FROM_CALENDAR,
    //         payload: {
    //             monday: monday,
    //             tuesday: tuesday,
    //             wednesday: wednesday,
    //             thursday: thursday,
    //             friday: friday,
    //             saturday: saturday,
    //             sunday: sunday
    //         }
    //     });
    // };
    setDatesFromCalendar(selectedDate){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_SELECTED_WEEK_DATES,
            payload: {
                selectedDate: selectedDate
            }
        });
    };
    setSelectedDailyPlan(dayKey, selectedDailyPlanId){
        AppDispatcher.dispatch({
            actionType: AppConst.PLANNER_SET_DAILY_PLAN,
            payload: {
                dayKey: dayKey,
                selectedDailyPlanId: selectedDailyPlanId
            }
        });
    };
    closeBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.PLANNER_CREATOR_CLOSE_BTN_CLICKED
        });
    };
    editBtnClicked(dayKey){
        AppDispatcher.dispatch({
            actionType: AppConst.PLANNER_CREATOR_EDIT_BTN_CLICKED,
            payload: {
                dayKey: dayKey
            }
        });
    };
    addBtnClicked(){
        // AppDispatcher.dispatch({
        //     actionType: AppConst.PLANNER_CLEAR_DATA
        // });
        AppDispatcher.dispatch({
            actionType: AppConst.PLANNER_CREATOR_ADD_BTN_CLICKED
        });
    };
    // editBtnClicked(){
    //     AppDispatcher.dispatch({
    //         actionType: AppConst.PLANNER_CREATOR_EDIT_BTN_CLICKED
    //     });
    // };
    deleteBtnClicked(day){
        let self = this;

        Planner.deleteDailyPlanWithDate(day.id).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.PLANNER_CREATOR_DELETE_BTN_CLICKED
            });
        }).then(function(){
            // AppDispatcher.dispatch({
            //     actionType: AppConst.PLANNER_CLEAR_DATA
            // });
        }).then(function(){
            self.setPlansByDate(day.date);
            self.setVisitsByDate(day.date);
        });
    };
    createBtnClicked(day){
        let user = firebase.auth().currentUser;
        let dayForDb = {
            dailyPlanId: day.dailyPlanId,
            date: day.date
        };
        let self = this;

        Planner.createDailyPlanWithDate(dayForDb, user.uid).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.PLANNER_CREATOR_CREATE_BTN_CLICKED
            });
        }).then(function(){
            // AppDispatcher.dispatch({
            //     actionType: AppConst.PLANNER_CLEAR_DATA
            // });
        })
        .then(function(){
            self.setPlansByDate(day.date);
            self.setVisitsByDate(day.date);
        });
    };
    saveBtnClicked(day){
        let user = firebase.auth().currentUser;
        let dayForDb = {
            dailyPlanId: day.dailyPlanId,
            date: day.date,
            id: day.id,
            plannerId: day.plannerId
        };
        let self = this;

        Planner.saveDailyPlanWithDate(dayForDb, user.uid).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.PLANNER_CREATOR_SAVE_BTN_CLICKED
            });
        }).then(function(){
            self.setPlansByDate(day.date);
            self.setVisitsByDate(day.date);
        });
    }
    setPlansByDate(selectedDate){
        let dates = CalendarFunctions.getWholeWeekBySelectedDate(selectedDate);
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                Planner.getPlansForPlannerByDates(dates, user.uid).then(function(plans){
                    AppDispatcher.dispatch({
                        actionType: AppConst.PLANNER_SET_PLANS_FROM_DATABASE,
                        payload: {
                            dayPlans: plans
                        }
                    });
                });
            }
        });
    };
    setPlansByDates(dates){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                Planner.getPlansForPlannerByDates(dates, user.uid).then(function(plans){
                    AppDispatcher.dispatch({
                        actionType: AppConst.PLANNER_SET_PLANS_FROM_DATABASE,
                        payload: {
                            dayPlans: plans
                        }
                    });
                });
            }
        });
    };
    setVisitsByDate(selectedDate){
        let dates = CalendarFunctions.getWholeWeekBySelectedDate(selectedDate);
        let visitDaysForSlides = [];
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                Planner.getVisitDaysByDates(dates, user.uid).then(function(visitDays){
                    visitDaysForSlides = visitDays;
                    AppDispatcher.dispatch({
                        actionType: AppConst.PLANNER_SET_VISIT_DAYS_FROM_DATABASE,
                        payload: {
                            visitDays: visitDays
                        }
                    });
                }).then(function(){
                    CalendarGridActionCreator.setSlideDays(visitDaysForSlides, true);
                });
            }
        });
    };
}

export default new PlannerActionCreator();