const { Pool } = require('pg');
const { password } = require('pg/lib/defaults');

const pool = new Pool(

    {
        user: 'amr',
        database: 'dbproject',
        port: 5432,
        host: 'localhost',
        password: 'aaa'
    }
)

module.exports = { pool };