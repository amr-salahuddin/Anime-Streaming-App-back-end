const { Pool } = require('pg');
const { password } = require('pg/lib/defaults');

const pool = new Pool(

    {
        user: 'dbadmin',
        database: 'animedatabase',
        port: 5432,
        host: 'dpg-cedmnqpa6gdvngfu264g-a',
        password: 'arxNGgGYtPeHegKx5uli4zYYjTyD7WrA'
    }
)

module.exports = { pool };