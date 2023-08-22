const admin = require("firebase-admin");
const serviceAccount = require("./service-account/alegriatech.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount), storageBucket: "gs://alegriatech-2bf22.appspot.com" });

const usersApi = require("./apis/users");
const albumsApi = require("./apis/albums");
const filesApi = require("./apis/files");

module.exports = {
  ...usersApi,
  ...albumsApi,
  ...filesApi,
};
