
const { pool } = require('./db');
const ANIME = require('./Anime');

const anime = new ANIME();
class BAN {
    async insertBan(userId, banReason) {
        try {
            const res = await pool.query(

                `INSERT INTO Ban (user_id,ban_reason) values (${userId},'${banReason}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllBans() {
        try {
            const res = await pool.query(

                "select * from episodes;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async deleteBan(episodeNumber, animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM episodes WHERE anime_id = ${animeId} AND episode_number=${episodeNumber} `);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = BAN;