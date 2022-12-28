const { user } = require('pg/lib/defaults');
const { pool } = require('./db');

const ANIME = require('./Anime');

const anime = new ANIME();
class RATINGS {
    async insertRating(userId, animeId, rating) {
        try {
            const check = await pool.query(`SELECT  rating from ratings where user_id = ${userId} AND anime_id = ${animeId}`);
            if (check.rowCount > 0) {
                console.log('check', check.rowCount);
                console.log('updateres1');

                let res1 = await pool.query(
                    `UPDATE  RATINGS SET rating = ${rating} WHERE anime_id = ${animeId} AND user_id = ${userId}`);
                console.log('updateres1');
            }
            else {
                const res = await pool.query(

                    `INSERT INTO RATINGS (user_id,anime_id,rating) values (${userId},${animeId},${rating});`);
                console.log(res.rowCount);
                const x = res.rowCount;
                console.log('res');
                console.log(x);
                console.log('fsdafsdafasdf');
            }
            console.log('24124');
            const res2 = await pool.query(

                `SELECT COUNT(rating) , SUM(rating) from RATINGS WHERE anime_id =${animeId};`);
            let count = res2.rows[0]['count'];
            let sum = res2.rows[0]['sum'];
            console.log('count', sum / count);
            console.log('xxxxco')
            anime.updateAnimeRating(animeId, sum / count).then(data => {
                console.log('sss', data);

            });


            //console.log('test', res.rowCount);
            return 1;
        }
        catch (error) {
            console.log(error);
            return 0;
        }
    }


    async deleteRating(userId, animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM RATINGS WHERE user_id = ${userId} AND anime_id = ${animeId}`);
            const x = res.rowCount;
            if (res.rowCount > 0) {
                const res2 = await pool.query(

                    `SELECT COUNT(rating) , SUM(rating) from RATINGS WHERE anime_id =${animeId};`);
                let count = res2.rows[0]['count'];
                let sum = res2.rows[0]['sum'];
                console.log('count', sum / count);
                console.log(x);

                anime.updateAnimeRating(animeId, sum / count).then(data => {
                    console.log('sss', data);

                });

            }

            //console.log('test', res.rowCount);
            return x;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = RATINGS;