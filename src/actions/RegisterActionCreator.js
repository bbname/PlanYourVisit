import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConst from '../constants/AppConst'

class RegisterActionCreator {
    setEmail(email){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_REGISTER_EMAIL,
            payload: {
                email: email
            }
        });
    };
    setPassword(password){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_REGISTER_PASSWORD,
            payload: {
                password: password
            }
        });
    };
    setPasswordConfirmation(passwordConfirmation){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_REGISTER_PASSWORD_CONFIRMATION,
            payload: {
                passwordConfirmation: passwordConfirmation,
            }
        });
    };
    setName(name){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_REGISTER_NAME,
            payload: {
                name: name
            }
        });
    };
    setCompanyName(companyName){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_REGISTER_COMPANY_NAME,
            payload: {
                companyName: companyName
            }
        });
    };
    clearData(){
        AppDispatcher.dispatch({
            actionType: AppConst.CLEAR_REGISTER_DATA
        });
    };
}

export default new RegisterActionCreator();