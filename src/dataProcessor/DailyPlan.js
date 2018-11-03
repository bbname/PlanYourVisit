import firebase from 'firebase';
import "firebase/auth";
import _ from 'underscore';

module.exports = {
    getDailyPlansForPlanner: function(plannerId){
        let id = null;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        return firebase.database().ref('/dailyPlans/')
        .orderByChild('plannerId').equalTo(plannerId).once('value')
        .then(function(snapshot) {
            return snapshot.val();
        });
    },
    getDailyPlan: function(dailyPlanId){
        return firebase.database().ref('/dailyPlans/' + dailyPlanId).once('value').then(function(snapshot) {
            return snapshot.val();
          });
    },
    createDailyPlan: function(dailyPlan, plannerId){
        let id = plannerId;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let dailyPlansRef = firebase.database().ref('dailyPlans/');
        let newDailyPlanRef = dailyPlansRef.push();
        let newId = newDailyPlanRef.getKey();

        let visitTypesForDb = _.map(dailyPlan.visitTypes, function(visitType){
            visitType.id = visitType.id.replace("daily-plan", "");
            return visitType;
        });
        let timeRangesForDb = _.map(dailyPlan.timeRanges, function(timeRange){
            timeRange.id = timeRange.id.replace("daily-plan", "");
            return timeRange;
        });
        return newDailyPlanRef.set({
            id: newId,
            plannerId: id,
            name: dailyPlan.name
        }).then(function(){
            _.each(visitTypesForDb, function(visitType){
                firebase.database().ref('dailyPlans/' + newId + '/visitTypes/' + visitType.id).set(visitType);
            });
            _.each(timeRangesForDb, function(timeRange){
                firebase.database().ref('dailyPlans/' + newId + '/timeRanges/' + timeRange.id).set(timeRange);
            });

            return true;          
        }).then(function(){
            return true;
        }).catch(function(error){
            return false;
        });
    },
    saveDailyPlan: function(dailyPlan, plannerId){
        let id = plannerId;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let dailyPlanRef = firebase.database().ref('dailyPlans/' + dailyPlan.id);

        let visitTypesForDb = _.map(dailyPlan.visitTypes, function(visitType){
            visitType.id = visitType.id.replace("daily-plan", "");
            return visitType;
        });
        let timeRangesForDb = _.map(dailyPlan.timeRanges, function(timeRange){
            timeRange.id = timeRange.id.replace("daily-plan", "");
            return timeRange;
        });

        return dailyPlanRef.update({
            id: dailyPlan.id,
            plannerId: id,
            name: dailyPlan.name
        }).then(function(){
            firebase.database().ref('dailyPlans/' + dailyPlan.id + '/visitTypes/').remove();
            firebase.database().ref('dailyPlans/' + dailyPlan.id + '/timeRanges/').remove();

            return true;
        }).then(function(){
            _.each(visitTypesForDb, function(visitType){
                firebase.database().ref('dailyPlans/' + dailyPlan.id + '/visitTypes/' + visitType.id).set(visitType);
            });
            _.each(timeRangesForDb, function(timeRange){
                firebase.database().ref('dailyPlans/' + dailyPlan.id + '/timeRanges/' + timeRange.id).set(timeRange);
            });

            return true;
        }).then(function(){
            return true;
        }).catch(function(error){
            return false;
        });
    },
    deleteDailyPlan: function(dailyPlanId){
        let dailyPlanRef = firebase.database().ref('dailyPlans/' + dailyPlanId);

        return dailyPlanRef.remove()
        .then(function(){
            return true;
        }).catch(function(error){
            return false;
        });
    },
}