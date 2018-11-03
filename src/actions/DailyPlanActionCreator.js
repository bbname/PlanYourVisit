import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import DailyPlan from '../dataProcessor/DailyPlan';
import firebase from 'firebase';
import "firebase/auth";

class DailyPlanActionCreator {
    setId(id){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_ID,
            payload: {
                id: id
            }
        });
    };
    setName(name){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_NAME,
            payload: {
                name: name
            }
        });
    };
    setTimeRanges(timeRanges){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_TIME_RANGES,
            payload: {
                timeRanges: timeRanges
            }
        });
    };
    setVisitTypes(visitTypes){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_VISIT_TYPES,
            payload: {
                visitTypes: visitTypes
            }
        });
    };
    clearData(){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_CLEAR_DATA
        });
    };
    closeBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_CREATOR_CLOSE_BTN_CLICKED
        });
    };
    editBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_CREATOR_EDIT_BTN_CLICKED
        });
    };
    addBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_CLEAR_DATA
        });
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_CREATOR_ADD_BTN_CLICKED
        });
    };
    editBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_CREATOR_EDIT_BTN_CLICKED
        });
    };
    deleteBtnClicked(id){
        let self = this;

        DailyPlan.deleteDailyPlan(id).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.DAILY_PLAN_CREATOR_DELETE_BTN_CLICKED
            });
        }).then(function(){
            AppDispatcher.dispatch({
                actionType: AppConst.DAILY_PLAN_CLEAR_DATA
            });
        }).then(function(){
            self.setDailyPlans();
        });
    };
    createBtnClicked(name, timeRanges, visitTypes){
        let user = firebase.auth().currentUser;
        let dailyPlan = {
            name: name,
            timeRanges: timeRanges,
            visitTypes: visitTypes
        };
        let self = this;

        DailyPlan.createDailyPlan(dailyPlan, user.uid).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.DAILY_PLAN_CREATOR_CREATE_BTN_CLICKED
            });
        }).then(function(){
            AppDispatcher.dispatch({
                actionType: AppConst.DAILY_PLAN_CLEAR_DATA
            });
        })
        .then(function(){
            self.setDailyPlans();
        });
    };
    saveBtnClicked(id, name, timeRanges, visitTypes){
        let user = firebase.auth().currentUser;
        let dailyPlan = {
            id: id,
            name: name,
            timeRanges: timeRanges,
            visitTypes: visitTypes
        };
        let self = this;

        DailyPlan.saveDailyPlan(dailyPlan, user.uid).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.DAILY_PLAN_CREATOR_SAVE_BTN_CLICKED
            });
        }).then(function(){
            self.setDailyPlans();
        });

    };
    setSelectedDailyPlan(dailyPlanId){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_SELECTED_DAILY_PLAN,
            payload: {
                selectedDailyPlanId: dailyPlanId
            }
        });
    };
    setDailyPlans(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                DailyPlan.getDailyPlansForPlanner(user.uid).then(function(dailyPlans){
                    AppDispatcher.dispatch({
                        actionType: AppConst.DAILY_PLAN_SET_DAILY_PLANS,
                        payload: {
                            dailyPlans: dailyPlans
                        }
                    });
                });
            }
        });
    };
    setSelectedTimeRanges(selectedTimeRangeIds){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_SELECTED_TIME_RANGES,
            payload: {
                selectedTimeRangeIds: selectedTimeRangeIds
            }
        });
    };
    setSelectedVisitTypes(selectedVisitTypeIds){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_SELECTED_VISIT_TYPES,
            payload: {
                selectedVisitTypeIds: selectedVisitTypeIds
            }
        });
    };
    deleteSelectedTimeRanges(){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_DELETE_SELECTED_TIME_RANGES
        });
    }
    deleteSelectedVisitTypes(){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_DELETE_SELECTED_VISIT_TYPE
        });
    }
}

export default new DailyPlanActionCreator();