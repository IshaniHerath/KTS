const Pool = require('pg').Pool;

const pool = new Pool({
    host : "localhost",
    user : "postgres",
    password : "",
    port : 5433,
    database : "kts",
    multipleStatements : true

});


module.exports = pool;