const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./postgresqlConfig');

const usuariosRoutes = require('./routes/users');
const reciclagemRoutes = require('./routes/recycle');
const admRoutes = require('./routes/admin-routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reciclagens', reciclagemRoutes);
app.use('/api/admin', admRoutes);

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
