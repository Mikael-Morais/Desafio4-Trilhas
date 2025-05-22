const express = require('express');
const router = express.Router();
const db = require('../postgresqlConfig');


// cadastro de usuário
// http://localhost:3000/api/usuarios/cadastro
router.post("/cadastro", async (req, res) => {
  const { nome, usuario, senha } = req.body;
  try {
    const existe = await db.query(`SELECT usuario FROM usuarios WHERE usuario='${usuario}';`);
    console.log(existe);
    if (existe.rows.length > 0) {
      return res.status(400).json({ erro: "Usuário já existe" });
    }
    await db.query("INSERT INTO usuarios (nome, usuario, senha) VALUES ($1, $2, $3)", [nome, usuario, senha]);
    res.json({ sucesso: true });
  } catch (err) {
    console.log(err)
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
});

// login de usuario
// http://localhost:3000/api/usuarios/login
router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const user = await db.query(`SELECT * FROM usuarios WHERE usuario='${usuario}' AND senha='${senha}'`);

    console.log(JSON.stringify(user.rows[0]));
    
    if (user.rows.length > 0) {
      res.json({ sucesso: true, user: JSON.stringify(user.rows[0])});
    } else {
      res.status(401).json({ erro: "Usuário ou senha inválidos" });
    }
  } catch (err) {
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

// listando usuários - caminho completo:
// http://localhost:3000/api/usuarios/
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT usuario FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
});


// salvando pontos - caminho completo:
// http://localhost:3000/api/usuarios/pontos
router.post("/pontos", async (req, res) => {
  const { usuario_id, usuario_senha, usuario_pontos } = req.body;

  try {
    const user = await db.query(`SELECT * FROM usuarios WHERE id='${usuario_id}' AND senha='${usuario_senha}'`);
    
    if (user.rows.length > 0) {
      await db.query(`UPDATE usuarios SET pontos='${usuario_pontos}' WHERE id='${usuario_id}'`);
      res.json({ sucesso: true });
    } else {
      res.status(401).json({ erro: "Erro ao confirmar usuário" });
    }
  } catch (err) {
    res.status(500).json({ erro: "Erro ao conectar ao servidor" });
  }
});

// ---------------------------

module.exports = router;