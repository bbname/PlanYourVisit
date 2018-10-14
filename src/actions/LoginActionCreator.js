import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConst from '../constants/AppConst'

class LoginActionCreator {
    setEmail(email){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_LOGIN_EMAIL,
            payload: {
                email: email
            }
        });
    };
    setPassword(password){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_LOGIN_PASSWORD,
            payload: {
                password: password
            }
        });
    };
    clearData(){
        AppDispatcher.dispatch({
            actionType: AppConst.CLEAR_LOGIN_DATA
        });
    };
}

export default new LoginActionCreator();