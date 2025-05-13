const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Exemplo de rota
app.get("/", (req, res) => {
  res.send("API EcoApp funcionando!");
});

module.exports = app;
