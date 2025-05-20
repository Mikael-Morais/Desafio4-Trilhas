const { Pool } = require('pg');

// configuração de conexão com banco de dados
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "zelus",
    password: "1234",
    port: 5432,
});


module.exports = pool;