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

app.get("/", async (req, res) => {
  logger.info("Iniciando coleta de todos os kits");
  let kits = [];

  await db
    .collection("kits")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let course = {
          id: doc.id,
          course: doc.data(),
        };
        kits.push(course);
      });
    });

  res.status(200).json({
    message: "Kits selecionados com sucesso!",
    data: kits,
  });
});

app.get("/:id", (req, res) => {
  let id = req.params.id;

  logger.info(`Iniciando coleta do kit ${id}`);

  db.collection("kits")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.status(200).json({
          message: "Kit selecionado com sucesso!",
          data: doc.data(),
        });
      }
    });
});

app.post("/", async (req, res) => {
  logger.info("Iniciando criação de kit");
  let { name, year, description, archiveZip } = req.body;

  await db
    .collection("kits")
    .add({ name, year, description, archiveZip })
    .then((insertResponse) => {
      let msg = `Kit criado com id ${insertResponse.id}`;
      logger.info(msg);
      res.status(201).json({
        message: msg,
        data: [],
      });
    })
    .catch((error) => {
      logger.error(error);
      res.status(400).json({
        message: error,
        data: [],
      });
    });
});

app.put("/:id", async (req, res) => {
  let id = req.params.id;
  let { name, year, description, archiveZip } = req.body;

  logger.info(`Iniciando atualização do kit ${id}`);

  await db
    .collection("kits")
    .doc(id)
    .set({ name, year, description, archiveZip })
    .then(() => {
      let msg = `Kit de id ${id} atualizado com sucesso!`;
      logger.info(msg);
      res.status(200).json({
        message: msg,
        data: [],
      });
    })
    .catch((error) => {
      logger.error(error);
      res.status(400).json({
        message: error,
        data: [],
      });
    });
});

app.delete("/:id", async (req, res) => {
  let id = req.params.id;

  logger.info(`Iniciando exclusão do kit ${id}`);

  await db
    .collection("kits")
    .doc(id)
    .delete()
    .then(() => {
      let msg = `Kit de id ${id} deletado com sucesso!`;
      logger.info(msg);
      res.status(200).json({
        message: msg,
        data: [],
      });
    })
    .catch((error) => {
      logger.error(error);
      res.status(400).json({
        message: error,
        data: [],
      });
    });
});

exports.courses = functions.https.onRequest(app);