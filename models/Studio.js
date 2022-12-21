
const { pool } = require('./db');


class STUDIO {
    async insertStudio(studioName, founder, yearFounded) {
        try {
            const res = await pool.query(

                `INSERT INTO Studio (studio_name,founder,year_founded) values ('${studioName}','${founder}',${yearFounded});`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAllStudios() {
        try {
            const res = await pool.query(

                "select * from studio;")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }


    async selectStudioById(studioId) {
        try {
            const res = await pool.query(

                `select * from studio where id = ${studioId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }


    async selectStudioByAnime(animeId) {
        try {
            let studioId = `(SELECT studio_id from anime where anime.id =${animeId})`;
            const res = await pool.query(

                `select * from studio where id = ${studioId}`)
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateStudio(studioName, founder, yearFounded, studioId) {
        try {
            const res = await pool.query(

                `UPDATE  Studio SET (studio_name,founder,year_founded) = ('${studioName}','${founder}',${yearFounded}) where id = ${studioId};`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }


    async deleteStudio(studioId) {
        try {
            const res = await pool.query(

                `DELETE FROM Studio WHERE id = ${studioId}`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = STUDIO;