const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Variáveis utilitárias
const db = admin.firestore();
const logger = functions.logger;

exports.createUser = functions.https.onRequest(async (req, res) => {
  logger.info("Iniciando criação de usuário");

  const {
    uid,
    name,
    birthday,
    email,
    country,
    state,
    roles,
    action,
    artisticFormation,
    professionalArt,
    englishLevel,
    spanishLevel,
    spiritCenter,
    otherLanguages,
    whatsapp,
    isWorker,
    isPlayer,
    isTheater,
    isLiterature,
    isDancer,
    isEFASCoordinator,
    isCONCAFRASCoordinator,
    isVisualArt,
    isActive,
    instruments,
    image,
  } = req.body;

  logger.info("Inserindo usuário no firestore");

  await db.collection("users").doc(uid).set({
    name,
    birthday,
    email,
    country,
    state,
    roles,
    action,
    artisticFormation,
    professionalArt,
    englishLevel,
    spanishLevel,
    spiritCenter,
    otherLanguages,
    whatsapp,
    isWorker,
    isPlayer,
    isTheater,
    isLiterature,
    isDancer,
    isEFASCoordinator,
    isCONCAFRASCoordinator,
    isVisualArt,
    isActive,
    instruments,
    image,
  });

  logger.info(`Usuário inserido com id ${uid}`);
  res.status(201).json({ result: `Usuário inserido com id ${uid}` });
});
