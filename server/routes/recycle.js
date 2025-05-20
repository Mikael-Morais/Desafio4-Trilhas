const express = require('express');
const router = express.Router();
const db = require('../postgresqlConfig');


// registrando reciclagem de um usuário
// http://localhost:3000/api/reciclagens/adicionar
router.post('/adicionar', async (req, res) => {
    const {usuario_id, origem, peso, pontos_gerados, materiais } = req.body;

    console.log(usuario_id, origem, peso, pontos_gerados, materiais);
    try {
        const result = await db.query(
            `INSERT INTO reciclagens (usuario_id, origem, peso, pontos_gerados)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [usuario_id, origem, peso, pontos_gerados]
        );

        const reciclagemId = result.rows[0].id;

        for (let material_id of materiais) {
            await db.query(
                `INSERT INTO reciclagem_materiais (reciclagem_id, material_id)
                VALUES ($1, $2)`,
                [reciclagemId, material_id]
            );
        }
        res.status(201).json({ sucesso:true, reciclagem_id:reciclagemId  })
    } catch (error) {
        console.error('Erro ao registrar reciclagem:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao registrar reciclagem.' });
  }
})

module.exports = router
