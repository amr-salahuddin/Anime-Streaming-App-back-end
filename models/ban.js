
const { pool } = require('./db');
const ANIME = require('./Anime');
const { rows } = require('pg/lib/defaults');

const anime = new ANIME();
class BAN {
    async insertBan(userId, banReason) {
        try {
            const res = await pool.query(

                `INSERT INTO Ban (user_id,ban_reason) values (${userId},'${banReason}');`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllBans() {
        try {
            const res = await pool.query(

                "select * from ban;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async deleteBan(userId) {
        try {
            const res = await pool.query(

                `DELETE FROM ban WHERE user_id = ${userId} `);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = BAN;