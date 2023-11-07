const admin = require("firebase-admin");
const serviceAccount = require("./service-account/alegriatech.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://alegriatech-2bf22.appspot.com",
});

const usersApi = require("./apis/users");
const albumsApi = require("./apis/albums");
const coursesApi = require("./apis/courses");
const kitsApi = require("./apis/kits");

module.exports = {
  ...usersApi,
  ...albumsApi,
  ...coursesApi,
  ...kitsApi,
};

