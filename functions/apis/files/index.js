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

app.post("/", (req, res) => {
  logger.info("Iniciando o upload de arquivos.");
  const body = req.body;
  const bucket = admin.storage().bucket();

  body.files.forEach((file) => {
    let typeFile = file.type.includes("x-zip") ? "application/zip" : file.type;
    let sizeBuffer = Buffer.from(file.size, "base64");
    let sizeByteArray = new Uint8Array(sizeBuffer);
    let newFile = bucket.file(`${body.path}/${file.name}`);
    let options = {
      resumable: false,
      metadata: { contentType: typeFile },
    };

    newFile.save(sizeByteArray, options);
  });

  res.status(201).json({
    message: "Upload realizado com sucesso!",
    data: [],
  });
});

exports.files = functions.https.onRequest(app);
