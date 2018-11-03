import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import TimeRange from '../dataProcessor/TimeRange';
import firebase from 'firebase';
import "firebase/auth";

class TimeRangeActionCreator {
    setId(id){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_SET_ID,
            payload: {
                id: id
            }
        });
    };
    setTimeFrom(timeFrom){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_SET_TIME_FROM,
            payload: {
                timeFrom: timeFrom
            }
        });
    };
    setTimeTo(timeTo){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_SET_TIME_TO,
            payload: {
                timeTo: timeTo
            }
        });
    };
    setTimeStep(timeStep){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_SET_TIME_STEP,
            payload: {
                timeStep: timeStep
            }
        });
    };
    clearData(){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_CLEAR_DATA
        });
    };
    closeBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_CREATOR_CLOSE_BTN_CLICKED
        });
    };
    editBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_CREATOR_EDIT_BTN_CLICKED
        });
    };
    addBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_CLEAR_DATA
        });
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_CREATOR_ADD_BTN_CLICKED
        });
    };
    editBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_CREATOR_EDIT_BTN_CLICKED
        });
    };
    deleteBtnClicked(id){
        let self = this;

        TimeRange.deleteTimeRange(id).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.TIME_RANGE_CREATOR_DELETE_BTN_CLICKED
            });
        }).then(function(){
            AppDispatcher.dispatch({
                actionType: AppConst.TIME_RANGE_CLEAR_DATA
            });
        }).then(function(){
            self.setTimeRanges();
        });
    };
    createBtnClicked(timeFrom, timeTo, timeStep){
        let user = firebase.auth().currentUser;
        let timeRange = {
            timeFrom: timeFrom,
            timeTo: timeTo,
            timeStep: timeStep
        };
        let self = this;

        TimeRange.createTimeRange(timeRange, user.uid).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.TIME_RANGE_CREATOR_CREATE_BTN_CLICKED
            });
        }).then(function(){
            AppDispatcher.dispatch({
                actionType: AppConst.TIME_RANGE_CLEAR_DATA
            });
        })
        .then(function(){
            self.setTimeRanges();
        });
    };
    saveBtnClicked(id, timeFrom, timeTo, timeStep){
        let user = firebase.auth().currentUser;
        let timeRange = {
            id: id,
            timeFrom: timeFrom,
            timeTo: timeTo,
            timeStep: timeStep
        };
        let self = this;

        TimeRange.saveTimeRange(timeRange, user.uid).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.TIME_RANGE_CREATOR_SAVE_BTN_CLICKED
            });
        }).then(function(){
            self.setTimeRanges();
        });

    };
    setSelectedTimeRange(timeRangeId){
        AppDispatcher.dispatch({
            actionType: AppConst.TIME_RANGE_SET_SELECTED_TIME_RANGE,
            payload: {
                selectedTimeRangeId: timeRangeId
            }
        });
    };
    setTimeRanges(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                TimeRange.getTimeRangesForPlanner(user.uid).then(function(timeRanges){
                    AppDispatcher.dispatch({
                        actionType: AppConst.TIME_RANGE_SET_TIME_RANGES,
                        payload: {
                            timeRanges: timeRanges
                        }
                    });
                });
            }
        });
    };
    setSelectedTimeRanges(selectedTimeRangeIds){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_SELECTED_AVAILABLE_TIME_RANGES,
            payload: {
                selectedTimeRangeIds: selectedTimeRangeIds
            }
        });
    };
}

export default new TimeRangeActionCreator();