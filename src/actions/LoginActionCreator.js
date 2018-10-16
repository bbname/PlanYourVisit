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
    loginBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.LOGIN_BTN_CLICKED
        });
    };
    loginUser(){
        AppDispatcher.dispatch({
            actionType: AppConst.LOGIN_USER
        });
    };
    runFormValidation(){
        AppDispatcher.dispatch({
            actionType: AppConst.LOGIN_RUN_VALIDATION
        });
    };
    checkLoginResult(){
        AppDispatcher.dispatch({
            actionType: AppConst.CHECK_LOGIN_RESULT
        });
    };
    closeLoginModal(isLoginSuccessFull){
        if(isLoginSuccessFull){
            document.getElementById("close-login-modal").click();
        }
    };
    showForgetPasswordModal(){
        AppDispatcher.dispatch({
            actionType: AppConst.SHOW_FORGET_PASSWORD_MODAL
        });
    };
    forgetPasswordBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.FORGET_PASSWORD_BTN_CLICKED
        });
    };
    runForgetPassword(){
        AppDispatcher.dispatch({
            actionType: AppConst.RUN_FORGET_PASSWORD
        });
    };
}

export default new LoginActionCreator();