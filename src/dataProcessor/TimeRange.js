import firebase from 'firebase';
import "firebase/auth";
import _ from 'underscore';

module.exports = {
    getTimeRangesForPlanner: function(plannerId){
        let id = null;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        return firebase.database().ref('/timeRanges/')
        .orderByChild('plannerId').equalTo(plannerId).once('value')
        .then(function(snapshot) {
            return snapshot.val();
        });
    },
    getTimeRange: function(timeRangeId){
        return firebase.database().ref('/timeRanges/' + timeRangeId).once('value').then(function(snapshot) {
            return snapshot.val();
          });
    },
    createTimeRange: function(timeRange, plannerId){
        let id = plannerId;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let timeRangesRef = firebase.database().ref('timeRanges/');
        let newTimeRangeRef = timeRangesRef.push();
        let newId = newTimeRangeRef.getKey();

        return newTimeRangeRef.set({
            id: newId,
            plannerId: id,
            timeFrom: timeRange.timeFrom.format("HH:mm"),
            timeTo: timeRange.timeTo.format("HH:mm"),
            timeStep: timeRange.timeStep
        }).then(function(){
            return true;
        }).catch(function(error){
            return false;
        });
    },
    saveTimeRange: function(timeRange, plannerId){
        let id = plannerId;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let timeRangeRef = firebase.database().ref('timeRanges/' + timeRange.id);

        return timeRangeRef.update({
            id: timeRange.id,
            plannerId: id,
            timeFrom: timeRange.timeFrom.format("HH:mm"),
            timeTo: timeRange.timeTo.format("HH:mm"),
            timeStep: timeRange.timeStep
        }).then(function(updatedTimeRange){
            return true;
        }).catch(function(error){
            return false;
        });
    },
    deleteTimeRange: function(timeRangeId){
        let timeRangeRef = firebase.database().ref('timeRanges/' + timeRangeId);

        return timeRangeRef.remove()
        .then(function(){
            return true;
        }).catch(function(error){
            return false;
        });
    },
}