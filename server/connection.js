const Pool = require('pg').Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "admin",
    port: 5432,
    database: "KTS",
    multiStatements: true
});

module.exports = pool;