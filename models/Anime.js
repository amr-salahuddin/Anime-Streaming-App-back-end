
const { pool } = require('./db');


class ANIME {
    async insertAnime(animeName, authorId, studioId, singerId, genre, rate, episodes, yearPub, imgLink) {

        //const checkNo = await pool.query(`SELECT COUNT(anime_name) where anime_name =${animeName}`);
        // console.log(checkNo);
        try {


            const res = await pool.query(

                `INSERT INTO Anime (anime_name,author_id,studio_id,singer_id,genre,rate,episodes,year_published,img_link) values('${animeName}',${authorId},${studioId},${singerId},'${genre}',${rate},${episodes},${yearPub},'${imgLink}');`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }




    async selectAnime() {
        try {
            const res = await pool.query(

                "select * from anime")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }



    async updateAnime(animeName, authorId, studioId, singerId, genre, rate, episodes, yearPub, imgLink, old_animeName) {
        try {

            const res = await pool.query(

                `UPDATE Anime  SET (anime_name,author_id,studio_id,singer_id,genre,rate,episodes,year_published,img_link) = ('${animeName}',${authorId},${studioId},${singerId},'${genre}',${rate},${episodes},${yearPub},'${imgLink}') WHERE anime_name='${old_animeName}';`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
    async deleteAnime(animeId) {
        try {
            const res = await pool.query(

                `DELETE FROM Anime WHERE id = '${animeName}'`);
            return 1;
        }
        catch (error) {
            return 0;
        }


    }
}

module.exports = ANIME;