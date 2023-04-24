require('dotenv').config();
const firebase = require("firebase-admin");
const User = require('./models/user');
const Conversation = require('./models/conversation');


// Best practice: Get the credential file and db url from environment varible
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

exports.sendMessageToFirebase = ((members, userId, message) => {
  console.log("sendMessageToFirebase : ", members, userId, message)

})