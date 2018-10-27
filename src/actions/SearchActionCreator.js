import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import SearchDataProcessor from '../dataProcessor/Search';

class SearchActionCreator {
    setNameCompanyName(value){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_NAME_COMPANY_NAME,
            payload: {
                value: value
            }
        });
    };
    setCity(value){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_CITY,
            payload: {
                value: value
            }
        });
    };
    searchSpecialists(value, city){
        SearchDataProcessor.getSpecialistsByNameOrCompanyName(value, city)
        .then(function(planners){
            AppDispatcher.dispatch({
                actionType: AppConst.SEARCH_SPECIALISTS,
                payload: {
                    specialists: planners
                }
            });
        });
    };
    searchCities(value){
        SearchDataProcessor.getCities(value)
        .then(function(cities){
            AppDispatcher.dispatch({
                actionType: AppConst.SEARCH_CITIES,
                payload: {
                    cities: cities
                }
            });
        });
    };
    clearSpecialistsData(){
        AppDispatcher.dispatch({
            actionType: AppConst.CLEAR_SPECIALISTS_SEARCH
        });
    };
    clearCitiesData(){
        AppDispatcher.dispatch({
            actionType: AppConst.CLEAR_CITIES_SEARCH
        });
    };
    clearData(){
        AppDispatcher.dispatch({
            actionType: AppConst.CLEAR_SEARCH
        });
    };
}

export default new SearchActionCreator();