const { pool } = require('./db');


class WATCHLIST {
    async insertWatchlist(userId, animeId) {
        try {
            const res = await pool.query(

                `INSERT INTO WATCHLIST (user_id,anime_id) values (${userId}, ${animeId});`);
            return 1;
        }
        catch (error) {
            console.log(error);

            return 0;
        }


    }




    async selectAllWatchlists() {
        try {
            const res = await pool.query(

                "select * from WATCHLIST;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }




    async selectWatchlistByUser(userId) {
        try {
            const res = await pool.query(

                `select * from WATCHLIST where user_id = ${userId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async deleteWatchlist(userId, animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM WATCHLIST WHERE anime_id = ${animeId} AND user_id =${userId}`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = WATCHLIST;