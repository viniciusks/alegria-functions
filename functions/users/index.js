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

  const writeResult = await db.collection("users").add({
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

  logger.info(`Usuário inserido com id ${writeResult.id}`);
  res.status(201).json({ result: `Usuário inserido com id ${writeResult.id}` });
});

exports.users = functions.https.onRequest(app);
