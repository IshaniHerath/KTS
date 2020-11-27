const Pool = require('pg').Pool;

// const pool = new Pool({
//     host : "localhost",
//     user : "postgres",
//     password : "admin",
//     port : 5432,
//     database : "KTS",
//     multipleStatements : true
// });

const pool = new Pool({
    host : "kts-postgresql.postgres.database.azure.com",
    user : "ishani@kts-postgresql",
    password : "ish@1234",
    port : 5432,
    database : "kts",
    multipleStatements : true
});


module.exports = pool;
