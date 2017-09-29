// Simple test app to push data into Firebase db using nodejs

'use strict';

const http = require('http');
const firebase = require("firebase-admin");
// The 'private' directory doesn't exist in source control, create and populate with Firebase cert data
const serviceAccount = require("./private/GVDemo-a034f68fba6f.json"); 
const testData = require("./data/studentSummary.json"); 
const dbPath = "1/userState/https%3A%2F%2Flearn%2Econcord%2Eorg%2Fapi%2Fv1%2Fclasses%2F325/https%3A%2F%2Flearn%2Econcord%2Eorg%2F71692/itsData";

// Initialize connection to Firebase

console.info("Initialize firebase");
let learnPortalCredential = firebase.credential.cert(serviceAccount);
let app = firebase.initializeApp({
  credential: learnPortalCredential,
  databaseURL: "https://gvdemo-6f015.firebaseio.com"
}, "LearnPortal");

let db = firebase.database(app);

// Try to push data

console.info("Push data to firebase");
let ref = db.ref(dbPath);
ref.set(testData);

// Start listening and wait forever

let port = process.env.PORT || 3000;

let server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');
});

console.info("Waiting for connections on port " + port);
server.listen(port);