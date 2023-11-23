require('dotenv').config();
const firebase = require("firebase-admin");


// Best practice: Get the credential file and db url from environment variable
const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PROJECT_KEY_ID,
  "private_key": process.env.FIREBASE_PROJECT_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN,
};

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