const { user } = require('pg/lib/defaults');
const { pool } = require('./db');


class RATINGS {
    async insertRating(userId, animeId, rating) {
        console.log(userId, animeId, rating);
        try {
            const res = await pool.query(

                `INSERT INTO RATINGS (user_id,anime_id,rating) values (${userId},${animeId},${rating});`);
            console.log(res.rowCount);
            const x = res.rowCount;
            console.log('x:', x);
            if (x) {
                console.log('y', x);


                //  let count = res2.rows[0]['COUNT'];
                ///let sum = res2.rows[0]['SUM'];
                console.log(count, sum);
            }
            console.log('test', res);
            return x;
        }
        catch (error) {
            return 0;
        }
    }


    async deleteRating(userId, animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM RATINGS WHERE user_id = ${userId} AND anime_id = ${animeId}`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = RATINGS;