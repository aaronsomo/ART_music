var firebaseConfig = require('../config/firebaseConfig');

var admin = require('firebase-admin');

var serviceAccount = require("../config/pixie-bfec2-firebase-adminsdk-5bqtp-5680d15de1.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConfig.databaseURL
});

function deleteUser(uid) {
  admin.auth().deleteUser(uid)
    .then(function() {
      console.log('Successfully deleted user', uid);
    })
    .catch(function(error) {
      console.log('Error deleting user:', error);
    });
}

function getAllUsers(nextPageToken) {
  admin.auth().listUsers(100, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
          uid = userRecord.toJSON().uid;
          deleteUser(uid);
      });
      if (listUsersResult.pageToken) {
          getAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
}

getAllUsers();
