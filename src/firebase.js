require('dotenv').config();
const firebase = require("firebase-admin");

// Best practice: Get the credential file and db url from environment varible
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

exports.sendMessageToFirebase = ((members, userId, message) => {
  console.log("sendMessageToFirebase : ", members, userId, message)
  let tokenTab = []
  members.forEach(member => {
    member.firebaseToken.forEach(token => {
      if (token != null) {
        tokenTab.push(token.token)
      }
    })
  }
  )
  console.log("senderTab : ", tokenTab)
  console.log("message : ", message)
  firebase.messaging().sendToDevice(
    tokenTab, // ['token_1', 'token_2', ...]
    {
      data : {
        title: "New message",
        message: JSON.stringify(message),
        sender: JSON.stringify(userId),
      },
    },
    {
      // Required for background/quit data-only messages on iOS
      contentAvailable: true,
      // Required for background/quit data-only messages on Android
      priority: 'high',
    },
  );
})