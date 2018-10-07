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

        let weekDates = CalendarFunctions.getWholeWeekBySelectedDate(date);
        let weekDatesFromServer = [];
        _.each(weekDates, function (date){
            let year = date.year();
            let month = date.month()+1;
            let day = date.date();

            //query planners where planerId and year and month and day
            // odebrane query
            // Object {
            // planners {
            // 

            weekDatesFromServer.push()
        });
        // fetch data from api
        // get hours for a day by date

        // Utworzyc tablice dla danego tygodnia.
        // wyciangac dane dla odpowiednich dni
        // dodac do tablicy tak, aby powstala relacja dzien: { godzina: { zarezwowana: tak/nie, userId: jakisId/null }}
        // tygodniowa tablice przekazac do akcji dispatchera

        // Zmiana planow na razie, bedziemy pokazywac zawsze tylko jeden tydzien
        // bez doczytywania poprzedniego/nastepnego

        let someApiFunction = function(data){
            AppDispatcher.dispatch({
                actionType: AppConst.SET_CALENDAR_GRID_DATA,
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