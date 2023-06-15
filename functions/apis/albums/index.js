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
  let albums = [];

  await db
    .collection("albums")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        albums.push(doc.data());
      });
    });

  res.status(200).json({
    message: "Álbuns selecionados com sucesso!",
    data: albums,
  });
});

app.get("/:id", (req, res) => {
  let id = req.params.id;

  logger.info(`Iniciando busca pelo álbum com id ${id}`);

  db.collection("albums")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.status(200).json({
          message: "Álbum selecionado com sucesso!",
          data: doc.data(),
        });
      }
    });
});

app.post("/", async (req, res) => {
  logger.info("Iniciando criação de álbum");
  const { name, owner, musics, link } = req.body;

  await db
    .collection("albums")
    .add({
      name,
      owner,
      musics,
      link,
    })
    .then((insertResponse) => {
      let msg = `Álbum criado com id ${insertResponse.id}`;
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
  logger.info("Iniciando atualização de álbum");
  let id = req.params.id;
  const { name, owner, musics, link } = req.body;

  await db
    .collection("albums")
    .doc(id)
    .set({
      name,
      owner,
      musics,
      link,
    })
    .then(() => {
      let msg = `Álbum de id ${id} atualizado com sucesso!`;
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

  await db
    .collection("albums")
    .doc(id)
    .delete()
    .then((deleteResponse) => {
      let msg = `Álbum de id ${id} deletado com sucesso!`;
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

exports.albums = functions.https.onRequest(app);
