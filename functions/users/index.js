const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Variáveis utilitárias
const db = admin.firestore();
const logger = functions.logger;
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get("/hello", (req, res) => {
  res.end("Received GET request!");
});

app.post("/", async (req, res) => {
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

exports.users = functions.https.onRequest(app);
