
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




    async anime_list() {
        try {
            const res = await pool.query(

                "select id,anime_name,img_link,rate,episodes from anime")
            return res.rows;
        }
        catch (error) {
            console.error(error);
        }


    }

    async anime_details(animeId) {
        try {
            const res1 = await pool.query(

                `select au.author_name,
                au.id as author_id,
                si.singer_name, si.id as singer_id, 
                st.studio_name,st.id as studio_id,
                voic.va_name,voic.id as va_id



                from author as au,
                va as voic,
                singer as si, 
                studio as st,
                anime as an
                where an.id =${animeId}
                AND au.id = an.author_id
                AND si.id = an.singer_id
                AND st.id = an.studio_id
                AND voic.id = an.va_id`)

            const res2 = await pool.query(

                `SELECT * from character where anime_id=${animeId} `)

            const awards = await pool.query(

                `SELECT   award_name   from anime_awards where anime_id=${animeId} `)

            const episodes = await pool.query(

                `SELECT   episode_number,episode_link   from episodes where anime_id=${animeId} `)
            let x = { 'mains': res1.rows, "characters": res2.rows, "awards": awards.rows, "episodes": episodes.rows };
            return x;
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