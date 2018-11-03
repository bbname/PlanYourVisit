import _ from "underscore";

// let _timeUnitsForUser = [
//     "15 min",
//     "30 min",
//     "45 min",
//     "1 godz.",
//     "1,5 godz.",
//     "2 godz."
// ];
// let _timeUnitsForDatabase = [
//     15,
//     30,
//     45,
//     60,
//     90,
//     120
// ];

let _timeUnits = [
    {"15 min": 15},
    {"30 min": 30},
    {"45 min": 45},
    {"1 godz.": 60},
    {"1,5 godz.": 90},
    {"2 godz.": 120}
]

module.exports = {
    getTimeCost: function(timeCost){
        let results = _.pluck(_timeUnits, timeCost);
        let result = _.find(results, function(res){
            return res !== undefined;
        });
        return result;
    },
    getTimeCostForUser: function(timeCost){
        let invertedTimeUnits = [];

        _.each(_timeUnits, function(timeUnit){
            let invertedTimeUnit = _.invert(timeUnit)
            invertedTimeUnits.push(invertedTimeUnit);
        });

        let results = _.pluck(invertedTimeUnits, timeCost);
        let result = _.find(results, function(res){
            return res !== undefined;
        });
        return result;
    },
    isTimeCostCorrect: function(timeCost){
        let result = _.findWhere(_timeUnits, timeCost);
        
        if(result === undefined){
            return false;
        }
        else{
            return true;
        }
    }
}