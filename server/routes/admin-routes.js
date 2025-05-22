const express = require('express');
const router = express.Router();
const db = require('../postgresqlConfig');

// listando reciclagens na pagina de adm
// http://localhost:3000/api/admin/admregistro
router.get("/admregistro", async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                r.id AS recicl_id,
                r.usuario_id,
                r.origem,
                r.peso,
                r.pontos_gerados,
                r.data_reciclagem,
                r.verificado,
                u.nome AS nome_usuario,
                json_agg(json_build_object('id', m.id, 'nome', m.nome)) AS materiais
            FROM reciclagens r
            JOIN usuarios u ON r.usuario_id = u.id
            LEFT JOIN reciclagem_materiais rm ON rm.reciclagem_id = r.id
            LEFT JOIN materiais m ON m.id = rm.material_id
            WHERE r.verificado = false
            GROUP BY r.id, u.nome
            ORDER BY r.data_reciclagem DESC
        `);

        res.json(result.rows);
    } catch (err) {
        console.error("Erro ao buscar reciclagens:", err);
        res.status(500).json({ erro: "Erro ao listar reciclagens" });
    }
});


// listando reciclagens na pagina de adm
// http://localhost:3000/api/admin/verificar
router.post("/verificar", async (req, res) => {
  const { id } = req.body;

  try {
    await db.query(`UPDATE reciclagens SET verificado=true WHERE id='${id}'`);
    console.log(usuario_pontos+ " atualizados");
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao conectar ao servidor" });
  }
});

module.exports = router;
