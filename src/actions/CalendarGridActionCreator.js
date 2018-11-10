import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../constants/AppConst';
import CalendarGridFunctions from '../utils/CalendarGridFunctions';

class CalendarGridActionCreator {
    setSlideDays(days){
        AppDispatcher.dispatch({
            actionType: AppConst.SET_DAY_SLIDES,
            payload: {
                slideDays: CalendarGridFunctions.generateWeekSlides(days, true)
            }
        })
    };
    // setDaySlides(day){
    //     AppDispatcher.dispatch({
    //         actionType: AppConst.SELECT_WHOLE_WEEK_BY_DAY_IN_CALENDAR,
    //         payload: {
    //             selectedDate: date
    //         }
    //     })
    // };
}

export default new CalendarGridActionCreator();