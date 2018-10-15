import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConst from '../constants/AppConst'

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
}

export default new UserActionCreator();