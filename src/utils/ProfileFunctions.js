import firebase from 'firebase';
import "firebase/auth";

module.exports = {
    isCurrentUserPlanner: function(){
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                    let user = snapshot.val();
                    return user.isPlanner;
                  });
              } 
            else {
                return null;
              }
          });
    },
    getUserFirebase: function(){
        let user = firebase.auth().currentUser;
        return user;
    },
    getUserDatabase: function(){
        let user = firebase.auth().currentUser;

        if(user === null){
            return firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                        let user = snapshot.val();
                        return user;
                      }).then(function(x){
                          return x;
                      });
                  } 
                else {
                    return null;
                  }
              });
        }
        else{
            return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                let user = snapshot.val();
                return user;
              }).then(function(x){
                  return x;
              });
        }
    },
    getPlanner: function(){
        let user = firebase.auth().currentUser;

        if(user !== null){
            return firebase.database().ref('/planners/' + user.uid).once('value').then(function(snapshot) {
                let user = snapshot.val();
                return user;
              }).then(function(x){
                  return x;
              });
        }
    },
    saveUserImage: function(file){
        let user = firebase.auth().currentUser;
        let userRef = firebase.database().ref('/users/' + user.uid);
        let plannersRef = firebase.database().ref('/planners/');
        let filePath = firebase.auth().currentUser.uid + '/profilePicture/' + file.name;

        return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
          // 3 - Generate a public URL for the file.
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            // 4 - Update the chat message placeholder with the image's URL.
            userRef.update({
              imageUrl: url,
              storageUri: fileSnapshot.metadata.fullPath
            }).then(function(){
                plannersRef.child(user.uid).once('value', function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref('/planners/' + user.uid).update({
                            imageUrl: url
                        });
                    }
                });
            });
            return url;
          });
        });
    },
    getPlannerFromDatabase: function(plannerId){
        return firebase.database().ref('/planners/' + plannerId).once('value').then(function(snapshot){
            return snapshot.val();
        });
    },
    getUserFromDatabase: function(userId){
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot){
            return snapshot.val();
        });
    }
};