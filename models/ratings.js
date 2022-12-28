const { user } = require('pg/lib/defaults');
const { pool } = require('./db');

const ANIME = require('./Anime');

const anime = new ANIME();
class RATINGS {
    async insertRating(userId, animeId, rating) {
        console.log(userId, animeId, rating);
        try {
            const res = await pool.query(

                `INSERT INTO RATINGS (user_id,anime_id,rating) values (${userId},${animeId},${rating});`);
            console.log(res.rowCount);
            const x = res.rowCount;
            if (x) {
                const res2 = await pool.query(

                    `SELECT COUNT(rating) , SUM(rating) from RATINGS WHERE anime_id =${animeId};`);
                let count = res2.rows[0]['count'];
                let sum = res2.rows[0]['sum'];
                console.log('count', sum / count);
                console.log(x);

                let tst;
                anime.updateAnimeRating(animeId, (sum / count)).then(data => { tst = data; });
                console.log('tttt', tst);

            }

            //console.log('test', res.rowCount);
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