import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConst from '../constants/AppConst'

class CalendarActionCreator {
    selectWeekByDayInCalendar(date){
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
        // fetch data from api
        // get hours for a day by date

        // Utworzyc tablice dla danego tygodnia.
        // wyciangac dane dla odpowiednich dni
        // dodac do tablicy tak, aby powstala relacja dzien: { godzina: { zarezwowana: tak/nie, userId: jakisId/null }}
        // tygodniowa tablice przekazac do akcji dispatchera


        let someApiFunction = function(data){
            AppDispatcher.dispatch({
                actionType: AppConst.SET_SELECTED_WEEK_DATES,
                payload: {
                    selectedDate: date
                }
            });
        };

        AppDispatcher.dispatch({
            actionType: AppConst.SET_SELECTED_WEEK_DATES,
            payload: {
                selectedDate: date
            }
        });
    };
}

export default new CalendarActionCreator();