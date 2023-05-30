const admin = require("firebase-admin");
const serviceAccount = require("./service-account/alegriatech.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const usersApi = require("./users");

module.exports = {
  ...usersApi,
};
