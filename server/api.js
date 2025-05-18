// api.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let usuarios = [
  { usuario: "admin", senha: "admin123" },
  { usuario: "paulo", senha: "1234" },
];

// cadastro de usuário
app.post("/api/usuarios", (req, res) => {
  const { usuario, senha } = req.body;
  if (usuarios.find((u) => u.usuario === usuario)) {
    return res.status(400).json({ erro: "Usuário já existe" });
  }
  usuarios.push({ usuario, senha });
  res.json({ sucesso: true });
});

// login
app.post("/api/login", (req, res) => {
  const { usuario, senha } = req.body;
  const user = usuarios.find((u) => u.usuario === usuario && u.senha === senha);
  if (user) {
    res.json({ sucesso: true });
  } else {
    res.status(401).json({ erro: "Usuário ou senha inválidos" });
  }
});

// listando usuarios
app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
