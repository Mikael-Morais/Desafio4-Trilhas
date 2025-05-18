const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// configuração da conexão com o banco
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "zelus",
  password: "1234",
  port: 5432,
});

// cadastro de usuário
app.post("/api/usuarios", async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const existe = await pool.query("SELECT * FROM usuarios WHERE usuario = $1", [usuario]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ erro: "Usuário já existe" });
    }
    await pool.query("INSERT INTO usuarios (usuario, senha) VALUES ($1, $2)", [usuario, senha]);
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
});

// login
app.post("/api/login", async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const user = await pool.query("SELECT * FROM usuarios WHERE usuario = $1 AND senha = $2", [usuario, senha]);
    if (user.rows.length > 0) {
      res.json({ sucesso: true });
    } else {
      res.status(401).json({ erro: "Usuário ou senha inválidos" });
    }
  } catch (err) {
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

// listando usuários
app.get("/api/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT usuario FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
});

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
