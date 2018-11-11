import VisitorActionCreator from '../actions/VisitorActionCreator';
import VisitorStore from '../stores/VisitorStore';
import CalendarFunctions from "../utils/CalendarFunctions";
import _ from 'underscore';
import moment from 'moment';

module.exports = {
    handleOnFreeHourClick: function(e){
        VisitorActionCreator.setSelectedVisitDate(e.target.id);
        VisitorActionCreator.setSelectedVisitDayWithHours(e.target.id, VisitorStore.getPlannerId());
        // VisitorActionCreator.setAvailableVisitTypes(e.target.id, VisitorStore.getPlannerId());
    },
    getAvailableVisitTypes: function(dayHours, stringSelectedDateWithHour, availableVisitTypes){
        let availableVisitTypesForSelectedHour = [];

        _.each(availableVisitTypes, function(visitType){
            let hour = dayHours.find(function(dayHour){
                return CalendarFunctions.getDateWithHoursFormatForDatabase(dayHour.dateObj) === stringSelectedDateWithHour;
            });

            let visitTimeCost = (visitType.timeCost - 1);
            let selectedHourIndex = _.findIndex(dayHours, hour);
            let currentHour = moment(dayHours[selectedHourIndex].dateObj);
            let forCheck = moment(currentHour);

            for(let i = (selectedHourIndex+1); i < dayHours.length; i++){
                forCheck.add(visitTimeCost, 'minutes');
                let nextHour = moment(dayHours[i].dateObj);

                if(forCheck.isAfter(nextHour)){
                    if(nextHour.isReserved){
                        break;
                    }
                }
                else{
                    availableVisitTypesForSelectedHour.push(visitType);
                }
            }
        });

        return availableVisitTypesForSelectedHour;
    }
}