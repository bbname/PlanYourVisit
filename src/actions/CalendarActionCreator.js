import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConst from '../constants/AppConst'
import CalendarFunctions from '../utils/CalendarFunctions'
import _ from 'underscore'

class CalendarActionCreator {
    selectWeekByDayInCalendar(date, planerId){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_SELECTED_DATE,
            payload: {
                selectedDate: date
            }
        });
        AppDispatcher.dispatch({
            actionType: AppConst.SET_SELECTED_WEEK_DATES,
            payload: {
                selectedDate: date
            }
        });
    };
}

export default new CalendarActionCreator();