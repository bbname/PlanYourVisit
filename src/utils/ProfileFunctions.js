import firebase from 'firebase';
import "firebase/auth";

module.exports = {
    getUserFirebase: function(){
        let user = firebase.auth().currentUser;
        return user;
    },
    getUserDatabase: function(){
        let user = firebase.auth().currentUser;

        if(user !== null){
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
    }
};