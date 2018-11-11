import firebase from 'firebase';
import "firebase/auth";
import _ from 'underscore';
import CalendarFunctions from "../utils/CalendarFunctions";
import DailyPlan from "./DailyPlan";
import moment from 'moment';

module.exports = {
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


        // return firebase.database().ref('/visits/' + id + '/' + date + '/' + hour).update({
        //     isReserved: true,
        //     clientId: userId,
        //     selectedVisitTypeId: selectedVisitType.id,
        //     userConfirmed: false,
        //     plannerCancel: false
        // }).then(function(){
        //     return firebase.database().ref('/visitors/' + userId + '/visits/' + plannerId + '/' + stringDate).set({
        //         date: stringDate,
        //         plannerId: plannerId,
        //         visitType: selectedVisitType,
        //         userConfirmed: false,
        //         plannerCancel: false
        //     });
        // });
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
    },
    // getVisitDaysByDate: function(date, plannerId){
    //     let id = plannerId;

    //     if(id == null){
    //         let user = firebase.auth().currentUser;
    //         id = user.uid;
    //     }
        
    //     let allPlannerVisitDays;
    //     return firebase.database().ref('/visits/')
    //     .orderByChild('plannerId').equalTo(id)
    //     .once('value').then(function(snapshot){
    //         allPlannerVisitDays = snapshot.val();
    //         return true;
    //     }).then(function(){
    //         return _.filter(allPlannerVisitDays, function(visitDay){
    //             return visitDay === CalendarFunctions.getDateFormatForDatbase(date);
    //         });
    //     });
    // },
    // createDailyPlanWithDate: function(day, plannerId){
    //     let id = plannerId;

    //     if(plannerId == null){
    //         let user = firebase.auth().currentUser;
    //         id = user.uid;
    //     }

    //     let plansRef = firebase.database().ref('plans/');
    //     let newPlanRef = plansRef.push();
    //     let newId = newPlanRef.getKey();

    //     return newPlanRef.set({
    //         id: newId,
    //         plannerId: id,
    //         dailyPlanId: day.dailyPlanId,
    //         date: CalendarFunctions.getDateFormatForDatbase(day.date)
    //     }).then(function(){
    //         let timeRangesRef = firebase.database().ref('dailyPlans/' + day.dailyPlanId + '/timeRanges');
    //         let timeRanges;

    //         return timeRangesRef.once('value').then(function(snapshot) {
    //             timeRanges = snapshot.val();
    //             return true;
    //         }).then(function(){
    //             _.each(timeRanges, function(timeRange){
    //                 let dates = CalendarFunctions.generateMomentDatesForTimeRangeHours(
    //                     CalendarFunctions.getDateFormatForDatbase(day.date), 
    //                     timeRange.timeFrom, 
    //                     timeRange.timeTo, 
    //                     timeRange.timeStep);

    //                 let calendarDate = dates[0].format("YYYY-MM-DD");  

    //                 _.each(dates, function(date){
    //                     let hour = date.format("HH:mm");
    //                     return firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour).set({
    //                         date: date.format("YYYY-MM-DD HH:mm"),
    //                         isReserved: false
    //                     }).then(function(){
    //                         return DailyPlan.getDailyPlan(day.dailyPlanId).then(function(dailyPlan){
    //                             _.each(dailyPlan.visitTypes, function(visitType){
    //                                 firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour + '/availableVisitTypes/' + visitType.id).set(visitType);
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     }).catch(function(error){
    //         return false;
    //     });
    // },
    // saveDailyPlanWithDate: function(day, plannerId){
    //     let id = plannerId;

    //     if(plannerId == null){
    //         let user = firebase.auth().currentUser;
    //         id = user.uid;
    //     }

    //     let planRef = firebase.database().ref('plans/' + day.id);

    //     return planRef.update({
    //         id: day.id,
    //         plannerId: id,
    //         dailyPlanId: day.dailyPlanId,
    //         date: CalendarFunctions.getDateFormatForDatbase(day.date)
    //     }).then(function(){
    //         let timeRangesRef = firebase.database().ref('dailyPlans/' + day.dailyPlanId + '/timeRanges');
    //         let timeRanges;

    //             return timeRangesRef.once('value').then(function(snapshot) {
    //             timeRanges = snapshot.val();
    //             return true;
    //         }).then(function(){
    //             _.each(timeRanges, function(timeRange){
    //                 let dates = CalendarFunctions.generateMomentDatesForTimeRangeHours(
    //                     CalendarFunctions.getDateFormatForDatbase(day.date), 
    //                     timeRange.timeFrom, 
    //                     timeRange.timeTo, 
    //                     timeRange.timeStep);

    //                 let calendarDate = dates[0].format("YYYY-MM-DD");  




    //                 return firebase.database().ref('visits/' + id + '/' + calendarDate).remove().then(function(){
    //                     _.each(dates, function(date){
    //                         let hour = date.format("HH:mm");
    //                         return firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour).set({
    //                             date: date.format("YYYY-MM-DD HH:mm"),
    //                             isReserved: false
    //                         }).then(function(){
    //                             return DailyPlan.getDailyPlan(day.dailyPlanId).then(function(dailyPlan){
    //                                 _.each(dailyPlan.visitTypes, function(visitType){
    //                                     firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour + '/availableVisitTypes/' + visitType.id).set(visitType);
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     }).catch(function(error){
    //         return false;
    //     });
    // },
    // deleteDailyPlanWithDate: function(planId){
    //     let planRef = firebase.database().ref('plans/' + planId);
    //     let plan;

    //     return planRef.once('value').then(function(snapshot) {
    //         plan = snapshot.val();
    //         return true;
    //       }).then(function(){
    //         return firebase.database().ref('visits/' + plan.plannerId + '/' + plan.date).remove().then(function(){
    //             return planRef.remove()
    //             .then(function(){
    //                 return true;
    //             }).catch(function(error){
    //                 return false;
    //             });
    //         });
    //       });
    // },
}