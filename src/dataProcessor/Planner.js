import firebase from 'firebase';
import "firebase/auth";
import _ from 'underscore';
import CalendarFunctions from "../utils/CalendarFunctions";
import DailyPlan from "./DailyPlan";

module.exports = {
    getPlansForPlannerByDates: function(dates, plannerId){
        let id = plannerId;

        if(id == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let allPlannerPlans;
        return firebase.database().ref('/plans/')
        .orderByChild('plannerId').equalTo(id).once('value')
        .then(function(snapshot) {
           allPlannerPlans = snapshot.val();
           return allPlannerPlans;
        }).then(function(){
            let stringFormatDates = _.map(dates, function(date){
                return CalendarFunctions.getDateFormatForDatbase(date);
            });
            
            return _.filter(allPlannerPlans, function(plan){
                return _.contains(stringFormatDates, plan.date);
            })
        });
    },
    getDailyPlanWithDate: function(planId){
        return firebase.database().ref('/plans/' + planId).once('value').then(function(snapshot) {
            return snapshot.val();
          });
    },
    getVisitDaysByDates: function(dates, plannerId){
        let id = plannerId;

        if(id == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
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

            //return allPlannerVisitDays;
            //   return allPlannerVisitDays;
        
        // let allPlannerVisitDays;
        // return firebase.database().ref('/visits/')
        // .orderByChild('plannerId').equalTo(id)
        // .once('value').then(function(snapshot){
        //     allPlannerVisitDays = snapshot.val();
        //     return true;
        // }).then(function(){
        //     let stringFormatDates = _.map(dates, function(date){
        //         return CalendarFunctions.getDateFormatForDatbase(date);
        //     });

        //     return _.filter(allPlannerVisitDays, function(visitDay){
        //         return _.contains(stringFormatDates, visitDay);
        //     });
        // });
    },
    getVisitDaysByDate: function(date, plannerId){
        let id = plannerId;

        if(id == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }
        
        let allPlannerVisitDays;
        return firebase.database().ref('/visits/')
        .orderByChild('plannerId').equalTo(id)
        .once('value').then(function(snapshot){
            allPlannerVisitDays = snapshot.val();
            return true;
        }).then(function(){
            return _.filter(allPlannerVisitDays, function(visitDay){
                return visitDay === CalendarFunctions.getDateFormatForDatbase(date);
            });
        });
    },
    createDailyPlanWithDate: function(day, plannerId){
        let id = plannerId;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let plansRef = firebase.database().ref('plans/');
        let newPlanRef = plansRef.push();
        let newId = newPlanRef.getKey();

        return newPlanRef.set({
            id: newId,
            plannerId: id,
            dailyPlanId: day.dailyPlanId,
            date: CalendarFunctions.getDateFormatForDatbase(day.date)
        }).then(function(){
            let timeRangesRef = firebase.database().ref('dailyPlans/' + day.dailyPlanId + '/timeRanges');
            let timeRanges;

            return timeRangesRef.once('value').then(function(snapshot) {
                timeRanges = snapshot.val();
                return true;
            }).then(function(){
                _.each(timeRanges, function(timeRange){
                    let dates = CalendarFunctions.generateMomentDatesForTimeRangeHours(
                        CalendarFunctions.getDateFormatForDatbase(day.date), 
                        timeRange.timeFrom, 
                        timeRange.timeTo, 
                        timeRange.timeStep);

                    let calendarDate = dates[0].format("YYYY-MM-DD");  

                    _.each(dates, function(date){
                        let hour = date.format("HH:mm");
                        return firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour).set({
                            date: date.format("YYYY-MM-DD HH:mm"),
                            isReserved: false
                        }).then(function(){
                            return DailyPlan.getDailyPlan(day.dailyPlanId).then(function(dailyPlan){
                                _.each(dailyPlan.visitTypes, function(visitType){
                                    firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour + '/availableVisitTypes/' + visitType.id).set(visitType);
                                });
                            });
                        });
                    });
                });
            });
        }).catch(function(error){
            return false;
        });
    },
    saveDailyPlanWithDate: function(day, plannerId){
        let id = plannerId;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let planRef = firebase.database().ref('plans/' + day.id);

        return planRef.update({
            id: day.id,
            plannerId: id,
            dailyPlanId: day.dailyPlanId,
            date: CalendarFunctions.getDateFormatForDatbase(day.date)
        }).then(function(){
            let timeRangesRef = firebase.database().ref('dailyPlans/' + day.dailyPlanId + '/timeRanges');
            let timeRanges;

                return timeRangesRef.once('value').then(function(snapshot) {
                timeRanges = snapshot.val();
                return true;
            }).then(function(){
                _.each(timeRanges, function(timeRange){
                    let dates = CalendarFunctions.generateMomentDatesForTimeRangeHours(
                        CalendarFunctions.getDateFormatForDatbase(day.date), 
                        timeRange.timeFrom, 
                        timeRange.timeTo, 
                        timeRange.timeStep);

                    let calendarDate = dates[0].format("YYYY-MM-DD");  




                    return firebase.database().ref('visits/' + id + '/' + calendarDate).remove().then(function(){
                        _.each(dates, function(date){
                            let hour = date.format("HH:mm");
                            return firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour).set({
                                date: date.format("YYYY-MM-DD HH:mm"),
                                isReserved: false
                            }).then(function(){
                                return DailyPlan.getDailyPlan(day.dailyPlanId).then(function(dailyPlan){
                                    _.each(dailyPlan.visitTypes, function(visitType){
                                        firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour + '/availableVisitTypes/' + visitType.id).set(visitType);
                                    });
                                });
                            });
                        });
                    });




                    // _.each(dates, function(date){
                    //     let hour = date.format("HH:mm");
                    //     return firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour).set({
                    //         date: date.format("YYYY-MM-DD HH:mm"),
                    //         isReserved: false
                    //     }).then(function(){
                    //         return DailyPlan.getDailyPlan(day.dailyPlanId).then(function(dailyPlan){
                    //             _.each(dailyPlan.visitTypes, function(visitType){
                    //                 firebase.database().ref('visits/' + id + '/' + calendarDate + '/' + hour + '/availableVisitTypes/' + visitType.id).set(visitType);
                    //             });
                    //         });
                    //     });
                    // });
                });
            });
        }).catch(function(error){
            return false;
        });
    },
    deleteDailyPlanWithDate: function(planId){
        let planRef = firebase.database().ref('plans/' + planId);
        let plan;

        return planRef.once('value').then(function(snapshot) {
            plan = snapshot.val();
            return true;
          }).then(function(){
            return firebase.database().ref('visits/' + plan.plannerId + '/' + plan.date).remove().then(function(){
                return planRef.remove()
                .then(function(){
                    return true;
                }).catch(function(error){
                    return false;
                });
            });
          });
    },
}