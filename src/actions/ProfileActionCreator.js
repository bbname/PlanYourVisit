import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import ProfileFunctions from '../utils/ProfileFunctions';

class ProfileActionCreator {
    setUser(){
        ProfileFunctions.getUserDatabase().then(function (user){
            AppDispatcher.dispatch({
                actionType: AppConst.SET_PROFILE_USER,
                payload: {
                    user: user
                }
            });
        });
    };
    setImage(image){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_PROFILE_IMAGE,
            payload: {
                image: image
            }
        });
    };
    setCity(city){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_PROFILE_CITY,
            payload: {
                city: city
            }
        });
    };
    setAddress(address){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_PROFILE_ADDRESS,
            payload: {
                address: address
            }
        });
    };
    setPhone(phone){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_PROFILE_PHONE,
            payload: {
                phone: phone
            }
        });
    };
    setName(name){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_PROFILE_NAME,
            payload: {
                name: name
            }
        });
    };
    setCompanyName(companyName){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_PROFILE_COMPANY_NAME,
            payload: {
                companyName: companyName
            }
        });
    };
    clearData(){
        AppDispatcher.dispatch({
            actionType: AppConst.CLEAR_PROFILE_DATA
        });
    };
    editBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.EDIT_BTN_CLICKED
        });
    };
    closeBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.CLOSE_BTN_CLICKED
        });
        this.setUser();
    };
    saveBtnClicked(){
        AppDispatcher.dispatch({
            actionType: AppConst.SAVE_BTN_CLICKED
        });
    };
    saveUserUpdate(){
        AppDispatcher.dispatch({
            actionType: AppConst.UPDATE_USER,
        });
    };
    saveUserImage(file){
        ProfileFunctions.saveUserImage(file).then(function (imageUrl){
            AppDispatcher.dispatch({
                actionType: AppConst.SET_PROFILE_IMAGE,
                payload: {
                    imageUrl: imageUrl
                }
            });
        });
    }
}

export default new ProfileActionCreator();