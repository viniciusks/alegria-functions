const admin = require("firebase-admin");
const serviceAccount = require("./service-account/alegriatech.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const usersApi = require("./apis/users");
const albumsApi = require("./apis/albums");

module.exports = {
  ...usersApi,
  ...albumsApi,
};
