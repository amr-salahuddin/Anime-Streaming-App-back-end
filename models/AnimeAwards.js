
const { pool } = require('./db');


class ANIMEAWARDS {
    async insertAnimeAward(awardName, animeId) {
        try {
            const res = await pool.query(

                `INSERT INTO anime_awards (award_name,anime_id) values ('${awardName}',${animeId});`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllAnimeAwards() {
        try {
            const res = await pool.query(

                "select * from anime_awards")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async selectAwardsByAnime(animeId) {
        try {
            const res = await pool.query(

                `select * from anime_awards where anime_id = ${animeId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateAnimeAward(awardName, animeId, old_awardName) {
        try {
            const res = await pool.query(

                `UPDATE  anime_awards SET (award_name,anime_id) = ('${awardName}',${animeId}) WHERE anime_id=${animeId} AND award_name='${old_awardName}' ] ;`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
        }


    }

    async deleteAnimeAward(awardName, animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM anime_awards WHERE anime_id = ${animeId} AND award_name='${awardName}'`);
            return res.rowCount;
        }
        catch (error) {
            return 0;
            console.log(error);
        }


    }
}

module.exports = ANIMEAWARDS;