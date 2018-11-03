import firebase from 'firebase';
import "firebase/auth";
import _ from 'underscore';

module.exports = {
    getVisitTypesForPlanner: function(plannerId){
        let id = null;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        return firebase.database().ref('/visitTypes/')
        .orderByChild('plannerId').equalTo(plannerId).once('value')
        .then(function(snapshot) {
            return snapshot.val();
        });
    },
    getVisitType: function(visitTypeId){
        return firebase.database().ref('/visitTypes/' + visitTypeId).once('value').then(function(snapshot) {
            return snapshot.val();
          });
    },
    createVisitType: function(visitType, plannerId){
        let id = plannerId;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let visitTypesRef = firebase.database().ref('visitTypes/');
        let newVisitTypeRef = visitTypesRef.push();
        let newId = newVisitTypeRef.getKey();

        return newVisitTypeRef.set({
            id: newId,
            plannerId: id,
            name: visitType.name,
            description: visitType.description,
            timeCost: visitType.timeCost,
            moneyCost: visitType.moneyCost,
        }).then(function(){
            return true;
        }).catch(function(error){
            return false;
        });
    },
    saveVisitType: function(visitType, plannerId){
        let id = plannerId;

        if(plannerId == null){
            let user = firebase.auth().currentUser;
            id = user.uid;
        }

        let visitTypeRef = firebase.database().ref('visitTypes/' + visitType.id);

        return visitTypeRef.update({
            id: visitType.id,
            plannerId: id,
            name: visitType.name,
            description: visitType.description,
            timeCost: visitType.timeCost,
            moneyCost: visitType.moneyCost,
        }).then(function(updatedVisitType){
            return true;
        }).catch(function(error){
            return false;
        });
    },
    deleteVisitType: function(visitTypeId){
        let visitTypeRef = firebase.database().ref('visitTypes/' + visitTypeId);

        return visitTypeRef.remove()
        .then(function(){
            return true;
        }).catch(function(error){
            return false;
        });
    },
}