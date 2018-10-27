import firebase from 'firebase';
import "firebase/auth";
import _ from 'underscore';
import userImage from "../resources/userImage.png";

module.exports = {
    getSpecialistsByNameOrCompanyName: function(value, city){
        let plannersByCity = [];
        let plannersByUserName = [];
        let plannersByCompanyName = [];

        return firebase.database().ref('/planners/')
        .orderByChild('city').equalTo(city).once('value')
        .then(function(snapshot) {
            plannersByCity = snapshot.val();
            return plannersByCity;
        })
        .then(function(){
            plannersByUserName = _.filter(plannersByCity, function(planner){
                return planner.userName.startsWith(value)
            });

            plannersByCompanyName = _.filter(plannersByCity, function(planner){
                return planner.companyName.startsWith(value)
            });

            let planners = _.union(plannersByUserName, plannersByCompanyName);

            let specialists = _.map(planners, function(planner){
                let specialist = {
                    uid: planner.userId,
                    name: "",
                    imageUrl: ""
                };

                if(planner.userName.startsWith(value)){
                    specialist.name = planner.userName;
                }
                else{
                    specialist.name = planner.companyName;
                }

                if(planner.imageUrl === undefined || planner.imageUrl === null || planner.imageUrl === ""){
                    specialist.imageUrl = userImage;
                }
                else{
                    specialist.imageUrl = planner.imageUrl;
                }

                return specialist;
            });

            return specialists;
        });
    },
    getCities: function (value){
        
        return firebase.database().ref('/planners/')
        .orderByChild('city').startAt(value).once('value')
        .then(function(snapshot) {
            let planners = snapshot.val();
            let cities = _.map(planners, function(planner){
                return planner.city;
            });

            return cities;
        })
        .then(function(allCities){
            let uniqCities = _.uniq(allCities);
            return uniqCities;
        });
    }
};