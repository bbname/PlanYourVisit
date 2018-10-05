import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConst from '../constants/AppConst'

class CalendarGridActionCreator {
    selectWeekByDayInCalendar(date){
        AppDispatcher.dispatch({
            actionType: AppConst.SELECT_WHOLE_WEEK_BY_DAY_IN_CALENDAR,
            payload: {
                selectedDate: date
            }
        })
    };
}

export default new CalendarGridActionCreator();