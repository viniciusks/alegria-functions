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
  logger.info("Iniciando coleta de todos os cursos");
  let courses = [];

  await db
    .collection("courses")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let course = {
          id: doc.id,
          course: doc.data(),
        };
        courses.push(course);
      });
    });

  res.status(200).json({
    message: "Cursos selecionados com sucesso!",
    data: courses,
  });
});

app.get("/:id", (req, res) => {
  let id = req.params.id;

  logger.info(`Iniciando coleta do curso ${id}`);

  db.collection("courses")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.status(200).json({
          message: "Curso selecionado com sucesso!",
          data: doc.data(),
        });
      }
    });
});

app.post("/", async (req, res) => {
  logger.info("Iniciando criação de curso");
  let { name, description, category, archives } = req.body;

  await db
    .collection("courses")
    .add({ name, description, category, archives })
    .then((insertResponse) => {
      let msg = `Curso criado com id ${insertResponse.id}`;
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
  let { name, description, category, archives } = req.body;

  logger.info(`Iniciando atualização do curso ${id}`);

  await db
    .collection("courses")
    .doc(id)
    .set({ name, description, category, archives })
    .then(() => {
      let msg = `Curso de id ${id} atualizado com sucesso!`;
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

  logger.info(`Iniciando exclusão do curso ${id}`);

  await db
    .collection("courses")
    .doc(id)
    .delete()
    .then(() => {
      let msg = `Curso de id ${id} deletado com sucesso!`;
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
