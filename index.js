const admin = require("firebase-admin");
const si = require("systeminformation");

let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const getSystemInfo = async () => {
  const currentdate = new Date();
  const docRef = db.collection("temp").doc();
  const { main } = await si.cpuTemperature();
  console.log(
    "current cpu temp " +
      main +
      "now: " +
      newDate.today() +
      " @ " +
      newDate.timeNow()
  );
  docRef.set({
    celsius: main,
    createdAt: currentdate
  });
};

setInterval(function() {
  getSystemInfo();
}, 15000);
