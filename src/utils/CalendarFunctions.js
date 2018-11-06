import moment from 'moment';
module.exports = {
    getMinDate: function(){
        let currentDate = moment().locale('pl');
        let lastWeekBeforeCurrentDate = currentDate.subtract(7, "days");
        let lastWeekDayNr = lastWeekBeforeCurrentDate.day();
        // 0 nd
        // 1 pn
        // 6 sb
        const minDate = moment(lastWeekBeforeCurrentDate);
        if(lastWeekDayNr == 0){
            minDate.subtract(6, "days");
        }
        else{
            minDate.subtract(lastWeekDayNr-1, "days");
        }
    
        return minDate;
    },
    getMaxDate: function(){
        let currentDate = moment().locale('pl');
        let sixWeekAfterCurrentDate = currentDate.add(49, "days");
        let sixWeekDayNr = sixWeekAfterCurrentDate.day();
        // 0 nd
        // 1 pn
        // 6 sb
        const maxDate = moment(sixWeekAfterCurrentDate);
        if(sixWeekDayNr == 0){
            maxDate.subtract(6, "days");
        }
        else{
            maxDate.subtract(sixWeekDayNr, "days");
        }
    
        return maxDate;
    },
    getWholeWeekBySelectedDate: function(selectedDate){
        let currentdayOfWeekNr = selectedDate.day();
        let startDayOfWeekNr = 1;
        let endDayOfWeekNr = 6;
        let datesToHighlight = [];
        // 0 nd
        // 1 pn
        // 6 sb
    
        if(currentdayOfWeekNr == 0){
            for(let i = 6; i > -1; i--){
                let test = moment(selectedDate);
                datesToHighlight.push(test.subtract(i, "days"));
            }
        }
        else{
            for(let i = startDayOfWeekNr; i <= endDayOfWeekNr+1; i++){
                let test = moment(selectedDate);
                if(i <= currentdayOfWeekNr){
                    datesToHighlight.push(test.subtract(i-1, "days"));
                }
                else if(i > currentdayOfWeekNr){
                    datesToHighlight.push(test.add(i-currentdayOfWeekNr, "days"));
                }
            }
        }

        datesToHighlight = datesToHighlight.sort(function (lhs, rhs)  { return lhs > rhs ? 1 : lhs < rhs ? -1 : 0; });
        return datesToHighlight;
    },
    getDateFormatForDatbase: function(dateObj){
        return dateObj.format("YYYY-MM-DD");
    },
    getDateMomentObjFromDatabaseFormat: function(dateString){
        return moment(dateString, "YYYY-MM-DD");
    },
} 

