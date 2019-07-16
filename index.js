const admin = require("firebase-admin");
const si = require("systeminformation");

let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const getSystemInfo = async () => {
  const docRef = db.collection("temp").doc();
  const { main } = await si.cpuTemperature();
  docRef.set({
    celsius: main,
    createdAt: new Date()
  });
};

setInterval(function() {
  getSystemInfo();
}, 15000);
