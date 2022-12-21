const { pool } = require('./db');


class FAVORITES {
    async insertFavorites(userId, animeId) {
        try {
            const res = await pool.query(

                `INSERT INTO FAVORITES (user_id,anime_id) values (${userId}, ${animeId});`);
            return res;
        }
        catch (error) {
            console.log(error);

            return error;
        }


    }




    async selectAllFavorites() {
        try {
            const res = await pool.query(

                "select * from FAVORITES;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }




    async selectFavoritesByUser(userId) {
        try {
            const res = await pool.query(

                `select * from FAVORITES where user_id = ${userId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async deleteFavorites(userId, animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM FAVORITES WHERE anime_id = ${animeId} AND user_id =${userId}`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = FAVORITES;