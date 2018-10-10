import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConst from '../constants/AppConst'

class CalendarGridColumnDayActionCreator {
    reserveVisit(date, hour, plannerId){
        AppDispatcher.dispatch({
            actionType: AppConst.GET_HOURS_FOR_DAY,
            payload: {
                selectedDate: date
            }
        })
    };
}

export default new CalendarGridColumnDayActionCreator();