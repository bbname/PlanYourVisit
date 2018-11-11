import firebase from 'firebase';
import "firebase/auth";
import _ from 'underscore';
import CalendarFunctions from "../utils/CalendarFunctions";
import DailyPlan from "./DailyPlan";
import moment from 'moment';

module.exports = {    
    deleteVisitForPlanner: function (plannerId, userId, visitDate){
        if(userId === undefined || plannerId === undefined){
            return null;
        }

        let additionalHoursToUpdate;
        let dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(visitDate);
        let date = CalendarFunctions.getDateFormatForDatbase(dateObj);
        let hour = CalendarFunctions.getHoursFormatForDatabase(dateObj);

        return firebase.database().ref('/visitors/' + userId + '/visits/' + plannerId + '/' + visitDate).update({
            plannerCancel: true
        }).then(function(){
            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour).update({
                isReserved: false
            }).then(function(){
                return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/clientId').remove()
                .then(function(){
                    return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/partOf').remove()
                    .then(function(){
                        return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/plannerCancel').remove()
                        .then(function(){
                            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/selectedVisitTypeId').remove()
                            .then(function(){
                                return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/userConfirmed').remove()
                            });
                        });
                    });
                });
            }).then(function(){
                return firebase.database().ref('/visits/' + plannerId + '/' + date)
                .orderByChild('partOf').equalTo(visitDate).once('value').then(function(snapshot) {
                    additionalHoursToUpdate = snapshot.val();
                   return additionalHoursToUpdate;
                }).then(function(){
                    _.each(additionalHoursToUpdate, function(additionalHour){
                        let additionalDateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(additionalHour.date);
                        let addHour = CalendarFunctions.getHoursFormatForDatabase(additionalDateObj);

                        firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour).update({
                            isReserved: false
                        }).then(function(){
                            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/clientId').remove()
                            .then(function(){
                                return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/partOf').remove()
                                .then(function(){
                                    return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/plannerCancel').remove()
                                    .then(function(){
                                        return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/selectedVisitTypeId').remove()
                                        .then(function(){
                                            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/userConfirmed').remove()
                                        });
                                    });
                                });
                            });
                        });
                    });
                    
                    return true;
                });
            });
        });
    },
    getClientsForHours: function(hour){
        return firebase.database().ref('/users/' + hour.clientId).once('value')
        .then(function(snapshot){
            hour.client = {};
            let client = snapshot.val();
            hour.client.name = client.name;
            hour.client.email = client.email;
            hour.client.phone = client.phone;

            return hour;
        });
    },
    getReservedVisitsForPlanner: function(plannerId){
    let id = plannerId;

    if(id === undefined){
        return null;
    }

    let allPlannerVisitDays;
    let visitDays = [];

    return firebase.database().ref('/visits/' + id).once('value')
    .then(function(snapshot){
        allPlannerVisitDays = snapshot.val();
    }).then(function(){
        let allDaysDates = Object.keys(allPlannerVisitDays);
        let counter = 0;

        _.each(allPlannerVisitDays, function(visitDayHours){
            let day = {};
            day.date = allDaysDates[counter];
            day.hours = [];

            _.each(visitDayHours, function(hour){
                if(hour.isReserved && hour.partOf === undefined){
                    day.hours.push(hour);
                }
            });

            if(day.hours.length > 0){
                visitDays.push(day);
            }

            counter++;
        });

        return visitDays;
    });
},
    deleteVisitForVisitor: function(userId, plannerId, visitDate){
        if(userId === undefined || plannerId === undefined){
            return null;
        }

        return firebase.database().ref('/visitors/' + userId + '/visits/' + plannerId + '/' + visitDate).remove();
    },
    cancelVisitReservation: function(userId, plannerId, visitDate){
        if(userId === undefined || plannerId === undefined){
            return null;
        }

        let additionalHoursToUpdate;
        let dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(visitDate);
        let date = CalendarFunctions.getDateFormatForDatbase(dateObj);
        let hour = CalendarFunctions.getHoursFormatForDatabase(dateObj);

        return firebase.database().ref('/visitors/' + userId + '/visits/' + plannerId + '/' + visitDate).update({
            userConfirmed: false,
            userCanceled: true
        }).then(function(){
            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour).update({
                isReserved: false
            }).then(function(){
                return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/clientId').remove()
                .then(function(){
                    return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/partOf').remove()
                    .then(function(){
                        return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/plannerCancel').remove()
                        .then(function(){
                            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/selectedVisitTypeId').remove()
                            .then(function(){
                                return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour + '/userConfirmed').remove()
                            });
                        });
                    });
                });
            }).then(function(){
                return firebase.database().ref('/visits/' + plannerId + '/' + date)
                .orderByChild('partOf').equalTo(visitDate).once('value').then(function(snapshot) {
                    additionalHoursToUpdate = snapshot.val();
                   return additionalHoursToUpdate;
                }).then(function(){
                    _.each(additionalHoursToUpdate, function(additionalHour){
                        let additionalDateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(additionalHour.date);
                        let addHour = CalendarFunctions.getHoursFormatForDatabase(additionalDateObj);

                        firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour).update({
                            isReserved: false
                        }).then(function(){
                            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/clientId').remove()
                            .then(function(){
                                return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/partOf').remove()
                                .then(function(){
                                    return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/plannerCancel').remove()
                                    .then(function(){
                                        return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/selectedVisitTypeId').remove()
                                        .then(function(){
                                            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour + '/userConfirmed').remove()
                                        });
                                    });
                                });
                            });
                        });
                    });
                    
                    return true;
                });
            });
        });
    },
    confirmVisitReservation: function(userId, plannerId, visitDate){
        if(userId === undefined || plannerId === undefined){
            return null;
        }

        let additionalHoursToUpdate;
        let dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(visitDate);
        let date = CalendarFunctions.getDateFormatForDatbase(dateObj);
        let hour = CalendarFunctions.getHoursFormatForDatabase(dateObj);

        return firebase.database().ref('/visitors/' + userId + '/visits/' + plannerId + '/' + visitDate).update({
            userConfirmed: true
        }).then(function(){
            return firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + hour).update({
                userConfirmed: true
            }).then(function(){
                return firebase.database().ref('/visits/' + plannerId + '/' + date)
                .orderByChild('partOf').equalTo(visitDate).once('value').then(function(snapshot) {
                    additionalHoursToUpdate = snapshot.val();
                   return additionalHoursToUpdate;
                }).then(function(){
                    _.each(additionalHoursToUpdate, function(additionalHour){
                        let additionalDateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(additionalHour.date);
                        let addHour = CalendarFunctions.getHoursFormatForDatabase(additionalDateObj);

                        firebase.database().ref('/visits/' + plannerId + '/' + date + '/' + addHour).update({
                            userConfirmed: true
                        });
                    });

                    return true;
                });
            });
        });
    },
    getReservedVisits: function(userId){
        let id = userId;

        if(id === undefined){
            return null;
        }

        let allPlannersWithVisits;

        return firebase.database().ref('/visitors/' + id + '/visits/').once('value')
        .then(function(snapshot){
            allPlannersWithVisits = snapshot.val();
            return allPlannersWithVisits;
        }).then(function(){
            let visits = [];

            _.each(allPlannersWithVisits, function(plannerVisits){
                _.each(plannerVisits, function(visitDay){
                    visits.push(visitDay);
                });
            });

            return visits;
        });
    },
    getVisitDayWithHours: function(stringDate, plannerId){
        let id = plannerId;

        let dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(stringDate);
        let date = CalendarFunctions.getDateFormatForDatbase(dateObj);

        if(id === undefined){
            return null;
        }

        return firebase.database().ref('/visits/' + id + '/' + date).once('value')
        .then(function(snapshot){
            return snapshot.val();
        });
    },
    reserveVisit: function(userId, plannerId, visitDay, selectedVisitType){
        let id = plannerId;

        if(id === undefined || userId === undefined){
            return null;
        }

        let stringDate = visitDay.date;
        let dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(stringDate);
        let date = CalendarFunctions.getDateFormatForDatbase(dateObj);
        let hour = CalendarFunctions.getHoursFormatForDatabase(dateObj);


        let additionalHoursToReserve = [];
        let visitTimeCost = (selectedVisitType.timeCost - 1);
        let hourDay = visitDay.hours.find(function(visitDayHour){
            return visitDayHour.date === stringDate;
        });
        let selectedHourIndex = _.findIndex(visitDay.hours, hourDay);
        let currentHour = moment(visitDay.hours[selectedHourIndex].dateObj);
        let forCheck = moment(currentHour);
        forCheck.add(visitTimeCost, 'minutes');

        for(let i = (selectedHourIndex+1); i < visitDay.hours.length; i++){
            let nextHour = visitDay.hours[i];

            if(forCheck.isAfter(nextHour.dateObj)){
                if(!nextHour.isReserved){
                    additionalHoursToReserve.push(nextHour);
                }
            }
            else{
                break;
            }
        }

        return firebase.database().ref('/visits/' + id + '/' + date + '/' + hour).update({
            isReserved: true,
            clientId: userId,
            selectedVisitTypeId: selectedVisitType.id,
            userConfirmed: false,
            plannerCancel: false
        }).then(function(){
            _.each(additionalHoursToReserve, function(additionalHour){
                let additionalDateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(additionalHour.date);
                let stringHour = CalendarFunctions.getHoursFormatForDatabase(additionalDateObj);

                firebase.database().ref('/visits/' + id + '/' + date + '/' + stringHour).update({
                    isReserved: true,
                    clientId: userId,
                    selectedVisitTypeId: selectedVisitType.id,
                    userConfirmed: false,
                    plannerCancel: false,
                    partOf: stringDate
                });
            });

            return true;
        }).then(function(){
            return firebase.database().ref('/visitors/' + userId + '/visits/' + plannerId + '/' + stringDate).set({
                date: stringDate,
                plannerId: plannerId,
                visitType: selectedVisitType,
                userConfirmed: false,
                plannerCancel: false
            });
        });
    },
    getAvailableVisitTypesForDate: function(stringDate, plannerId){
        let id = plannerId;

        if(id === undefined || stringDate === undefined){
            return null;
        }

        let dateObj = CalendarFunctions.getDateWithHourMomentObjFromDatabaseFormat(stringDate);
        let date = CalendarFunctions.getDateFormatForDatbase(dateObj);
        let hour = CalendarFunctions.getHoursFormatForDatabase(dateObj);

        return firebase.database().ref('/visits/' + id + '/' + date + '/' + hour).once('value')
        .then(function(snapshot){
            let hourDb = snapshot.val();
            return hourDb.availableVisitTypes;
        });
    },
    getVisitDaysByDates: function(dates, plannerId){
        let id = plannerId;

        if(id == null){
            return null;
        }

        let allPlannerVisitDays = [];
        let stringFormatDates = _.map(dates, function(date){
            return CalendarFunctions.getDateFormatForDatbase(date);
        });

            return firebase.database().ref('/visits/' + id + '/' + stringFormatDates[0]).once('value')
            .then(function(snapshot) {
                let visitDay = {};
                visitDay.date = stringFormatDates[0];
                visitDay.hours = snapshot.val();
                allPlannerVisitDays.push(visitDay);
                return allPlannerVisitDays;
            }).then(function(){
                return firebase.database().ref('/visits/' + id + '/' + stringFormatDates[1]).once('value')
                .then(function(snapshot) {
                    let visitDay = {};
                    visitDay.date = stringFormatDates[1];
                    visitDay.hours = snapshot.val();
                    allPlannerVisitDays.push(visitDay);
                    return allPlannerVisitDays;
                }).then(function(){
                    return firebase.database().ref('/visits/' + id + '/' + stringFormatDates[2]).once('value')
                    .then(function(snapshot) {
                        let visitDay = {};
                        visitDay.date = stringFormatDates[2];
                        visitDay.hours = snapshot.val();
                        allPlannerVisitDays.push(visitDay);
                        return allPlannerVisitDays;
                    }).then(function(){
                        return firebase.database().ref('/visits/' + id + '/' + stringFormatDates[3]).once('value')
                        .then(function(snapshot) {
                            let visitDay = {};
                            visitDay.date = stringFormatDates[3];
                            visitDay.hours = snapshot.val();
                            allPlannerVisitDays.push(visitDay);
                            return allPlannerVisitDays;
                        }).then(function(){
                            return firebase.database().ref('/visits/' + id + '/' + stringFormatDates[4]).once('value')
                            .then(function(snapshot) {
                                let visitDay = {};
                                visitDay.date = stringFormatDates[4];
                                visitDay.hours = snapshot.val();
                                allPlannerVisitDays.push(visitDay);
                                return allPlannerVisitDays;
                            }).then(function(){
                                return firebase.database().ref('/visits/' + id + '/' + stringFormatDates[5]).once('value')
                                .then(function(snapshot) {
                                    let visitDay = {};
                                    visitDay.date = stringFormatDates[5];
                                    visitDay.hours = snapshot.val();
                                    allPlannerVisitDays.push(visitDay);
                                    return allPlannerVisitDays;
                                }).then(function(){
                                    return firebase.database().ref('/visits/' + id + '/' + stringFormatDates[6]).once('value')
                                    .then(function(snapshot) {
                                        let visitDay = {};
                                        visitDay.date = stringFormatDates[6];
                                        visitDay.hours = snapshot.val();
                                        allPlannerVisitDays.push(visitDay);
                                        return allPlannerVisitDays;
                                    }).then(function(){
                                        return allPlannerVisitDays;
                                    });
                                });
                            });
                        });
                    });
                });
            });
    }
}