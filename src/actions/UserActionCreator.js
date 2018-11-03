import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import firebase from 'firebase';
import "firebase/auth";

class UserActionCreator {
    signInUser(user){
        AppDispatcher.dispatch({
            actionType: AppConst.SIGN_IN_USER,
            payload: {
                user: user
            }
        });
    };
    signOutUser(){
        AppDispatcher.dispatch({
            actionType: AppConst.SIGN_OUT_USER
        });
    };
    isCurrentUserPlanner(){
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                    let user = snapshot.val();
                    return user.isPlanner;
                  }).then(function(isUserPlanner){
                    AppDispatcher.dispatch({
                        actionType: AppConst.IS_CURRENT_USER_PLANNER,
                        payload: {
                            isPlanner: isUserPlanner
                        }
                    });
                  });
              } 
            else {
                return null;
              }
          });
    };
}

export default new UserActionCreator();