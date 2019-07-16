const admin = require("firebase-admin");
const si = require("systeminformation");

let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let docRef = db.collection("temp").doc();

const getSystemInfo = async () => {
  const { main } = await si.cpuTemperature();
  docRef.set({
    celsius: main,
    createdAt: new Date()
  });
};

setInterval(function() {
  getSystemInfo();
}, 15000);
