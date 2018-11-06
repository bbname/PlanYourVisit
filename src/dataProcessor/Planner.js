import firebase from 'firebase';
import "firebase/auth";
import _ from 'underscore';
import CalendarFunctions from "../utils/CalendarFunctions";

module.exports = {
    getPlansForPlannerByDates: function(dates, plannerId){
        let id = null;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let allPlannerPlans;
        return firebase.database().ref('/plans/')
        .orderByChild('plannerId').equalTo(plannerId).once('value')
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
            return true;
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
        }).then(function(updatedTimeRange){
            return true;
        }).catch(function(error){
            return false;
        });
    },
    deleteDailyPlanWithDate: function(planId){
        let planRef = firebase.database().ref('plans/' + planId);

        return planRef.remove()
        .then(function(){
            return true;
        }).catch(function(error){
            return false;
        });
    },
}