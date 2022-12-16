
const { restart } = require('nodemon');
const { pool } = require('./db');


class NEWS {
    async selectNews() {
        try {
            const res = await pool.query(

                `SELECT * FROM news ORDER BY publish_date DESC`);
            return res.rows;
        }
        catch (error) {
            return 0;
        }


    }





}

module.exports = NEWS;