const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./postgresqlConfig');

const usuariosRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/usuarios', usuariosRoutes);

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
