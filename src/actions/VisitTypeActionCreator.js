import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import VisitType from '../dataProcessor/VisitType';
import firebase from 'firebase';
import "firebase/auth";

class VisitTypeActionCreator {
    setId(id){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_SET_ID,
            payload: {
                id: id
            }
        });
    };
    setName(name){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_SET_NAME,
            payload: {
                name: name
            }
        });
    };
    setDescription(description){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_SET_DESCRIPTION,
            payload: {
                description: description
            }
        });
    };
    setTimeCost(timeCost){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_SET_TIME_COST,
            payload: {
                timeCost: timeCost
            }
        });
    };
    setMoneyCost(moneyCost){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_SET_MONEY_COST,
            payload: {
                moneyCost: moneyCost
            }
        });
    };
    clearData(){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_CLEAR_DATA
        });
    };
    closeBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_CREATOR_CLOSE_BTN_CLICKED
        });
    };
    editBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_CREATOR_EDIT_BTN_CLICKED
        });
    };
    addBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_CLEAR_DATA
        });
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_CREATOR_ADD_BTN_CLICKED
        });
    };
    editBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_CREATOR_EDIT_BTN_CLICKED
        });
    };
    deleteBtnClicked(id){
        let self = this;

        VisitType.deleteVisitType(id).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.VISIT_TYPE_CREATOR_DELETE_BTN_CLICKED
            });
        }).then(function(){
            AppDispatcher.dispatch({
                actionType: AppConst.VISIT_TYPE_CLEAR_DATA
            });
        }).then(function(){
            self.setVisitTypes();
        });
    };
    createBtnClicked(name, description, timeCost, moneyCost){
        let user = firebase.auth().currentUser;
        let visitType = {
            name: name,
            description: description,
            timeCost: timeCost,
            moneyCost: moneyCost
        };
        let self = this;

        VisitType.createVisitType(visitType, user.uid).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.VISIT_TYPE_CREATOR_CREATE_BTN_CLICKED
            });
        }).then(function(){
            AppDispatcher.dispatch({
                actionType: AppConst.VISIT_TYPE_CLEAR_DATA
            });
        })
        .then(function(){
            self.setVisitTypes();
        });
    };
    saveBtnClicked(id, name, description, timeCost, moneyCost){
        let user = firebase.auth().currentUser;
        let visitType = {
            id: id,
            name: name,
            description: description,
            timeCost: timeCost,
            moneyCost: moneyCost
        };
        let self = this;

        VisitType.saveVisitType(visitType, user.uid).then(function(boolVal){
            AppDispatcher.dispatch({
                actionType: AppConst.VISIT_TYPE_CREATOR_SAVE_BTN_CLICKED
            });
        }).then(function(){
            self.setVisitTypes();
        });

    };
    setSelectedVisitType(visitTypeId){
        AppDispatcher.dispatch({
            actionType: AppConst.VISIT_TYPE_SET_SELECTED_VISIT_TYPE,
            payload: {
                selectedVisitTypeId: visitTypeId
            }
        });
    };
    setVisitTypes(){
        //let user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                VisitType.getVisitTypesForPlanner(user.uid).then(function(visitTypes){
                    AppDispatcher.dispatch({
                        actionType: AppConst.VISIT_TYPE_SET_VISIT_TYPES,
                        payload: {
                            visitTypes: visitTypes
                        }
                    });
                });
            }
        });
    };
    setSelectedVisitTypes(selectedVisitTypeIds){
        AppDispatcher.dispatch({
            actionType: AppConst.DAILY_PLAN_SET_SELECTED_AVAILABLE_VISIT_TYPES,
            payload: {
                selectedVisitTypeIds: selectedVisitTypeIds
            }
        });
    };
}

export default new VisitTypeActionCreator();